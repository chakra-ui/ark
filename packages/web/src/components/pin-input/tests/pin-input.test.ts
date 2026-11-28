import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../examples/basic.js'
import { mount as CustomPlaceholder } from '../examples/custom-placeholder.js'
import { mount as Mask } from '../examples/mask.js'
import { mount as NormalizeValue } from '../examples/normalize-value.js'
import { mount as OtpMode } from '../examples/otp-mode.js'
import { mount as VerifyOnComplete } from '../examples/verify-on-complete.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const inputs = () => Array.from(document.querySelectorAll<HTMLInputElement>('ark-pin-input-input input'))

const pin = (index: number, count = 3) => screen.getByLabelText(`pin code ${index} of ${count}`)

const root = () => document.querySelector('ark-pin-input')!

const hiddenInput = () => document.querySelector<HTMLInputElement>('ark-pin-input-hidden-input input')!

const values = () => inputs().map((input) => input.value)

const settle = () => new Promise((resolve) => setTimeout(resolve, 50))

test('each input is labelled by its position inside a group named by the label', async () => {
  mount(Basic)

  await waitFor(() => expect(pin(1)).toBe(inputs()[0]))
  expect(pin(3)).toBe(inputs()[2])
  expect(screen.getByRole('group', { name: 'Label' })).toBe(document.querySelector('ark-pin-input-control'))
  expect(inputs()[0]).toHaveAttribute('inputmode', 'numeric')
})

test('typing fills each input, moves focus forward and reports completion', async () => {
  mount(Basic)
  const completed = vi.fn()
  root().addEventListener('valuecomplete', (event) => completed((event as CustomEvent).detail))
  await waitFor(() => expect(inputs()).toHaveLength(3))

  await user.click(pin(1))
  await user.keyboard('1')
  await waitFor(() => expect(pin(2)).toHaveFocus())

  await user.keyboard('23')

  await waitFor(() => expect(values()).toEqual(['1', '2', '3']))
  await waitFor(() =>
    expect(completed).toHaveBeenCalledWith(expect.objectContaining({ value: ['1', '2', '3'], valueAsString: '123' })),
  )
  expect(root()).toHaveAttribute('data-complete', '')
  expect(hiddenInput()).toHaveValue('123')
})

test('a character the type does not allow is rejected and reported', async () => {
  mount(Basic)
  const invalid = vi.fn()
  root().addEventListener('valueinvalid', (event) => invalid((event as CustomEvent).detail.value))
  await waitFor(() => expect(inputs()).toHaveLength(3))

  await user.click(pin(1))
  await user.keyboard('a')

  await waitFor(() => expect(invalid).toHaveBeenCalledWith('a'))
  expect(pin(1)).toHaveValue('')
  expect(pin(1)).toHaveFocus()
})

test('Backspace on an empty input clears the previous one and moves focus back', async () => {
  mount(Basic)
  await waitFor(() => expect(inputs()).toHaveLength(3))
  await user.click(pin(1))
  await user.keyboard('12')
  await waitFor(() => expect(pin(3)).toHaveFocus())

  await user.keyboard('{Backspace}')

  await waitFor(() => expect(pin(2)).toHaveFocus())
  expect(pin(2)).toHaveValue('')
  expect(pin(1)).toHaveValue('1')
})

test('pasting a code fills every input', async () => {
  mount(Basic)
  await waitFor(() => expect(inputs()).toHaveLength(3))
  await user.click(pin(1))

  await user.paste('987')

  await waitFor(() => expect(values()).toEqual(['9', '8', '7']))
  expect(root()).toHaveAttribute('data-complete', '')
})

test('otp sets one-time-code autocomplete on the first input only', async () => {
  mount(OtpMode)

  await waitFor(() => expect(inputs()[0]).toHaveAttribute('autocomplete', 'one-time-code'))
  expect(inputs()[1]).toHaveAttribute('autocomplete', 'off')
  expect(inputs()[2]).toHaveAttribute('autocomplete', 'off')
})

test('mask renders password inputs', async () => {
  mount(Mask)

  await waitFor(() => expect(inputs()[0]).toHaveAttribute('type', 'password'))
  expect(inputs()[2]).toHaveAttribute('type', 'password')
})

test('a custom placeholder shows on every input except the focused one', async () => {
  mount(CustomPlaceholder)
  await waitFor(() => expect(pin(1)).toHaveAttribute('placeholder', '*'))

  await user.click(pin(1))

  await waitFor(() => expect(pin(1)).toHaveAttribute('placeholder', ''))
  expect(pin(2)).toHaveAttribute('placeholder', '*')
})

test('normalizeValue transforms what the user types', async () => {
  mount(NormalizeValue)
  await waitFor(() => expect(inputs()).toHaveLength(3))
  await user.click(pin(1))

  await user.keyboard('a1b')

  await waitFor(() => expect(values()).toEqual(['A', '1', 'B']))
})

test('verify-on-complete marks a wrong code invalid and accepts the right one', async () => {
  mount(VerifyOnComplete)
  await waitFor(() => expect(inputs()).toHaveLength(4))
  await user.click(pin(1, 4))

  await user.keyboard('1235')

  await waitFor(() => expect(screen.getByText('Invalid code')).toBeVisible())
  expect(root()).toHaveAttribute('data-invalid', '')
  expect(pin(4, 4)).toHaveAttribute('aria-invalid', 'true')

  await user.keyboard('{Backspace}')

  await waitFor(() => expect(pin(3, 4)).toHaveFocus())
  expect(pin(4, 4)).toHaveValue('')
  expect(screen.getByText('Invalid code')).not.toBeVisible()

  await user.click(pin(4, 4))
  await user.keyboard('4')

  await waitFor(() => expect(screen.getByText('Code verified')).toBeVisible())
  expect(root()).not.toHaveAttribute('data-invalid')
})

test('clicking the label focuses the first input', async () => {
  mount(Basic)
  await waitFor(() => expect(inputs()).toHaveLength(3))

  await user.click(screen.getByText('Label'))

  await waitFor(() => expect(pin(1)).toHaveFocus())
})

test('the value attribute set after mount fills the inputs', async () => {
  mount(Basic)
  await waitFor(() => expect(inputs()).toHaveLength(3))

  root().setAttribute('value', '4,5,6')

  await waitFor(() => expect(values()).toEqual(['4', '5', '6']))
  expect(hiddenInput()).toHaveValue('456')
})

test('readonly keeps the value on Backspace and disabled disables every input', async () => {
  mount((container) => {
    Basic(container)
    container.querySelector('ark-pin-input')!.setAttribute('default-value', '1,2,3')
  })
  await waitFor(() => expect(values()).toEqual(['1', '2', '3']))

  root().setAttribute('readonly', '')
  await waitFor(() => expect(pin(3)).toHaveAttribute('readonly'))
  await user.click(pin(3))
  await user.keyboard('{Backspace}')
  await settle()
  expect(values()).toEqual(['1', '2', '3'])

  root().removeAttribute('readonly')
  root().setAttribute('disabled', '')

  await waitFor(() => expect(root()).toHaveAttribute('data-disabled', ''))
  for (const input of inputs()) expect(input).toBeDisabled()
  expect(hiddenInput()).toBeDisabled()
})
