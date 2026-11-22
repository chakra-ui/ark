import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../examples/basic.js'
import { mount as ControlledVisibility } from '../examples/controlled-visibility.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const passwordInput = () => document.querySelector('ark-password-input')!

const passwordField = () => document.querySelector('ark-password-input-input input')!

const findInput = async () => {
  await waitFor(() => expect(passwordField()).toHaveAttribute('type', 'password'))
  return passwordField()
}

test('the visibility trigger shows and hides the password and reports each change', async () => {
  mount(Basic)
  const input = await findInput()
  const changes: boolean[] = []
  passwordInput().addEventListener('visibilitychange', (event) => changes.push(event.detail.visible))

  await user.click(screen.getByRole('button', { name: 'Show password' }))

  await waitFor(() => expect(input).toHaveAttribute('type', 'text'))
  await waitFor(() => expect(input).toHaveFocus())
  expect(changes.at(-1)).toBe(true)

  await user.click(screen.getByRole('button', { name: 'Hide password' }))

  await waitFor(() => expect(input).toHaveAttribute('type', 'password'))
  expect(changes.at(-1)).toBe(false)
})

test('a controlled password input only changes visibility through its visible attribute', async () => {
  mount(ControlledVisibility)
  const input = await findInput()
  const requested: boolean[] = []
  passwordInput().addEventListener(
    'visibilitychange',
    (event) => {
      requested.push(event.detail.visible)
      event.stopImmediatePropagation()
    },
    { capture: true },
  )

  await user.click(screen.getByRole('button', { name: 'Show password' }))

  await waitFor(() => expect(requested).toEqual([true]))
  expect(input).toHaveAttribute('type', 'password')

  passwordInput().setAttribute('visible', 'true')

  await waitFor(() => expect(input).toHaveAttribute('type', 'text'))

  passwordInput().setAttribute('visible', 'false')

  await waitFor(() => expect(input).toHaveAttribute('type', 'password'))
})

test('the indicator switches with the visibility', async () => {
  mount(Basic)
  const visibleIcon = document.querySelector('ark-password-input-indicator:not([fallback])')!
  const hiddenIcon = document.querySelector('ark-password-input-indicator[fallback]')!
  await waitFor(() => expect(visibleIcon).not.toBeVisible())
  expect(hiddenIcon).toBeVisible()
  expect(hiddenIcon).toHaveAttribute('data-state', 'hidden')

  await user.click(screen.getByRole('button', { name: 'Show password' }))

  await waitFor(() => expect(visibleIcon).toBeVisible())
  expect(visibleIcon).toHaveAttribute('data-state', 'visible')
  expect(hiddenIcon).not.toBeVisible()
})

test('the password is submitted with its form under the root name', async () => {
  mount(Basic)
  const form = document.createElement('form')
  passwordInput().before(form)
  form.append(passwordInput())

  passwordInput().setAttribute('name', 'password')

  await waitFor(() => expect(document.querySelector('input[name=password]')).toBeInTheDocument())
  await user.type(document.querySelector('input[name=password]')!, 'hunter22')

  await waitFor(() => expect(Object.fromEntries(new FormData(form))).toEqual({ password: 'hunter22' }))
})
