import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../examples/basic.js'
import { mount as Controlled } from '../examples/controlled.js'
import { mount as Disabled } from '../examples/disabled.js'
import { mount as Indicator } from '../examples/indicator.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const toggle = () => document.querySelector('ark-toggle')!

test('clicking the toggle presses and releases it and reports each change', async () => {
  mount(Basic)
  const button = await screen.findByRole('button', { name: 'Bold' })
  const pressed: boolean[] = []
  toggle().addEventListener('pressedchange', (event) => pressed.push(event.detail.pressed))
  await waitFor(() => expect(button).toHaveAttribute('aria-pressed', 'false'))

  await user.click(button)

  await waitFor(() => expect(button).toHaveAttribute('aria-pressed', 'true'))
  expect(button).toHaveAttribute('data-pressed', '')

  await user.click(button)

  await waitFor(() => expect(button).toHaveAttribute('aria-pressed', 'false'))
  expect(pressed).toEqual([true, false])
})

test('a controlled toggle only changes through its pressed attribute', async () => {
  mount(Controlled)
  const button = await screen.findByRole('button', { name: 'Favorite' })
  const requested: boolean[] = []
  toggle().addEventListener(
    'pressedchange',
    (event) => {
      requested.push(event.detail.pressed)
      event.stopImmediatePropagation()
    },
    { capture: true },
  )

  await user.click(button)

  await waitFor(() => expect(requested).toEqual([true]))
  expect(button).toHaveAttribute('aria-pressed', 'false')

  toggle().setAttribute('pressed', 'true')

  await waitFor(() => expect(button).toHaveAttribute('aria-pressed', 'true'))

  toggle().setAttribute('pressed', 'false')

  await waitFor(() => expect(button).toHaveAttribute('aria-pressed', 'false'))
})

test('a disabled toggle disables its button', async () => {
  mount(Disabled)
  const button = await screen.findByRole('button', { name: 'Bold' })

  await waitFor(() => expect(button).toBeDisabled())
  expect(button).toHaveAttribute('data-disabled', '')
  expect(button).toHaveAttribute('aria-pressed', 'false')
})

test('the indicator swaps its fallback for the pressed content', async () => {
  mount(Indicator)
  const button = await screen.findByRole('button', { name: 'Favorite' })
  const pressed = document.querySelector('ark-toggle-indicator:not([fallback])')!
  const fallback = document.querySelector('ark-toggle-indicator[fallback]')!
  await waitFor(() => expect(pressed).not.toBeVisible())
  expect(fallback).toBeVisible()

  await user.click(button)

  await waitFor(() => expect(pressed).toBeVisible())
  expect(pressed).toHaveAttribute('data-pressed', '')
  expect(fallback).not.toBeVisible()
})
