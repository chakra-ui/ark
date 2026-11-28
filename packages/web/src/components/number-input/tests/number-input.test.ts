import { fireEvent, screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../examples/basic.js'
import { mount as MinMax } from '../examples/min-max.js'
import { mount as MouseWheel } from '../examples/mouse-wheel.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const input = () => screen.getByRole('textbox')

const root = () => document.querySelector('ark-number-input')!

const increment = () => document.querySelector<HTMLButtonElement>('ark-number-input-increment-trigger button')!

const decrement = () => document.querySelector<HTMLButtonElement>('ark-number-input-decrement-trigger button')!

const settle = () => new Promise((resolve) => setTimeout(resolve, 50))

const start = (example: (root: HTMLElement) => void, attributes: Record<string, string>) =>
  mount((container) => {
    example(container)
    const el = container.querySelector('ark-number-input')!
    for (const [name, value] of Object.entries(attributes)) el.setAttribute(name, value)
  })

test('the increment and decrement buttons step the value', async () => {
  start(Basic, { 'default-value': '0', step: '5' })
  await waitFor(() => expect(input()).toHaveValue('0'))

  increment().click()
  await waitFor(() => expect(input()).toHaveValue('5'))

  increment().click()
  await waitFor(() => expect(input()).toHaveValue('10'))

  decrement().click()
  await waitFor(() => expect(input()).toHaveValue('5'))
})

test('arrow keys step the value, Shift uses the large step and Alt the small step', async () => {
  start(Basic, { 'default-value': '0' })
  await user.click(input())

  await user.keyboard('{ArrowUp}')
  await waitFor(() => expect(input()).toHaveValue('1'))

  await user.keyboard('{Shift>}{ArrowUp}{/Shift}')
  await waitFor(() => expect(input()).toHaveValue('11'))

  await user.keyboard('{Alt>}{ArrowDown}{/Alt}')
  await waitFor(() => expect(input()).toHaveValue('10.9'))
})

test('large-step and small-step attributes override the defaults', async () => {
  start(Basic, { 'default-value': '0', 'large-step': '50', 'small-step': '0.5' })
  await user.click(input())

  await user.keyboard('{Shift>}{ArrowUp}{/Shift}')
  await waitFor(() => expect(input()).toHaveValue('50'))

  await user.keyboard('{Alt>}{ArrowUp}{/Alt}')
  await waitFor(() => expect(input()).toHaveValue('50.5'))
})

test('an out-of-range value is clamped on blur and the increment stops at max', async () => {
  mount(MinMax)
  await user.type(input(), '42')

  await user.tab()

  await waitFor(() => expect(input()).toHaveValue('10'))
  expect(increment()).toBeDisabled()
  expect(decrement()).toBeEnabled()
})

test('allow-out-of-range keeps a value past max and marks the input invalid', async () => {
  start(MinMax, { 'allow-out-of-range': '' })
  await user.type(input(), '42')

  await user.tab()

  await waitFor(() => expect(input()).toHaveValue('42'))
  expect(input()).toHaveAttribute('aria-invalid', 'true')
})

test('the mouse wheel changes the value only while the input is focused', async () => {
  start(MouseWheel, { 'default-value': '0' })
  await waitFor(() => expect(input()).toHaveValue('0'))

  fireEvent.wheel(input(), { deltaY: -1 })
  await settle()
  expect(input()).toHaveValue('0')

  await user.click(input())
  fireEvent.wheel(input(), { deltaY: -1 })

  await waitFor(() => expect(input()).toHaveValue('1'))
})

test('required, readonly and disabled attributes reach the input', async () => {
  mount(Basic)
  root().setAttribute('required', '')
  await waitFor(() => expect(input()).toBeRequired())

  root().setAttribute('readonly', '')
  await waitFor(() => expect(input()).toHaveAttribute('readonly'))

  root().removeAttribute('readonly')
  root().setAttribute('disabled', '')

  await waitFor(() => expect(input()).toBeDisabled())
  expect(increment()).toBeDisabled()
})
