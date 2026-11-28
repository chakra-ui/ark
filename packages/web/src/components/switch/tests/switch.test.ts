import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import '@ark-ui/web/field'

import { mount as Basic } from '../examples/basic.js'
import { mount as Controlled } from '../examples/controlled.js'
import { mount as Disabled } from '../examples/disabled.js'
import { mount as InitialChecked } from '../examples/initial-checked.js'
import { mount as WithField } from '../examples/with-field.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const input = () => document.querySelector<HTMLInputElement>('input[type=checkbox]')!

const settle = () => new Promise((resolve) => setTimeout(resolve, 50))

test('clicking the label toggles the switch', async () => {
  mount(Basic)
  await waitFor(() => expect(input()).not.toBeChecked())

  await user.click(screen.getByText('Label'))

  await waitFor(() => expect(input()).toBeChecked())
  expect(document.querySelector('ark-switch-control')).toHaveAttribute('data-state', 'checked')

  await user.click(screen.getByText('Label'))

  await waitFor(() => expect(input()).not.toBeChecked())
})

test('Space toggles the focused switch', async () => {
  mount(Basic)
  await waitFor(() => expect(input()).not.toBeChecked())
  await user.tab()
  expect(input()).toHaveFocus()

  await user.keyboard(' ')

  await waitFor(() => expect(input()).toBeChecked())
})

test('default-checked starts the switch on', async () => {
  mount(InitialChecked)

  await waitFor(() => expect(input()).toBeChecked())
})

test('a disabled switch disables its input and ignores clicks', async () => {
  mount(Disabled)
  await waitFor(() => expect(input()).toBeDisabled())
  const changed = vi.fn()
  document.querySelector('ark-switch')!.addEventListener('checkedchange', changed)

  await user.click(screen.getByText('Label'))
  await settle()

  expect(input()).not.toBeChecked()
  expect(changed).not.toHaveBeenCalled()
})

test('a controlled switch reports changes through checkedchange', async () => {
  mount(Controlled)
  const root = document.querySelector('ark-switch')!
  await waitFor(() => expect(input()).not.toBeChecked())

  await user.click(screen.getByText('Label'))

  await waitFor(() => expect(document.querySelector('output')).toHaveTextContent('checked: true'))
  expect(input()).toBeChecked()

  root.setAttribute('checked', 'false')

  await waitFor(() => expect(input()).not.toBeChecked())
  expect(document.querySelector('ark-switch-control')).toHaveAttribute('data-state', 'unchecked')
})

test('a field shows its helper text and hides the error text while valid', async () => {
  mount(WithField)
  await waitFor(() => expect(screen.getByText('Additional Info')).toBeVisible())

  expect(screen.queryByText('Error Info')).not.toBeVisible()
})

test('an invalid required field marks the switch and shows the error text', async () => {
  mount(WithField)
  const field = document.querySelector('ark-field')!
  field.setAttribute('invalid', '')
  field.setAttribute('required', '')

  await waitFor(() => expect(input()).toBeInvalid())
  expect(input()).toBeRequired()
  expect(screen.getByText('Error Info')).toBeVisible()
})

test('a disabled field disables the switch', async () => {
  mount(WithField)
  document.querySelector('ark-field')!.setAttribute('disabled', '')

  await waitFor(() => expect(input()).toBeDisabled())
})
