import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../../../../examples/password-input/basic.js'
import { mount as ControlledVisibility } from '../../../../examples/password-input/controlled-visibility.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const getInput = () => document.querySelector<HTMLInputElement>('ark-password-input-input input')!

test('password input trigger toggles the input type and emits visibilitychange', async () => {
  mount(Basic)
  const root = document.querySelector('ark-password-input')!
  await waitFor(() => expect(getInput()).toHaveAttribute('type', 'password'))
  const input = getInput()
  const changes: boolean[] = []
  root.addEventListener('visibilitychange', (event) => {
    changes.push((event as CustomEvent<{ visible: boolean }>).detail.visible)
  })

  await user.click(screen.getByRole('button', { name: 'Show password' }))
  await waitFor(() => expect(input).toHaveAttribute('type', 'text'))
  await waitFor(() => expect(input).toHaveFocus())
  expect(changes.at(-1)).toBe(true)

  await user.click(screen.getByRole('button', { name: 'Hide password' }))
  await waitFor(() => expect(input).toHaveAttribute('type', 'password'))
  expect(changes.at(-1)).toBe(false)
})

test('controlled password input waits for the visible attribute', async () => {
  mount(ControlledVisibility)
  const root = document.querySelector('ark-password-input')!
  await waitFor(() => expect(getInput()).toHaveAttribute('type', 'password'))
  const input = getInput()
  root.addEventListener('visibilitychange', (event) => event.stopImmediatePropagation(), { capture: true })

  await user.click(screen.getByRole('button', { name: 'Show password' }))
  await new Promise((resolve) => setTimeout(resolve, 50))
  expect(input).toHaveAttribute('type', 'password')

  root.setAttribute('visible', 'true')
  await waitFor(() => expect(input).toHaveAttribute('type', 'text'))

  root.setAttribute('visible', 'false')
  await waitFor(() => expect(input).toHaveAttribute('type', 'password'))
})

test('password input indicator switches with the visible state', async () => {
  mount(Basic)
  const shown = document.querySelector('ark-password-input-indicator:not([fallback])')!
  const fallback = document.querySelector('ark-password-input-indicator[fallback]')!

  await waitFor(() => expect(shown).not.toBeVisible())
  expect(fallback).toBeVisible()
  expect(fallback).toHaveAttribute('data-state', 'hidden')

  await user.click(screen.getByRole('button', { name: 'Show password' }))
  await waitFor(() => expect(shown).toBeVisible())
  expect(shown).toHaveAttribute('data-state', 'visible')
  expect(fallback).not.toBeVisible()
})

test('password input submits its value under the root name', async () => {
  mount(Basic)
  const root = document.querySelector('ark-password-input')!
  const form = document.createElement('form')
  root.before(form)
  form.append(root)
  root.setAttribute('name', 'password')

  await waitFor(() => expect(document.querySelector('input[name=password]')).toBeInTheDocument())
  await user.type(document.querySelector<HTMLInputElement>('input[name=password]')!, 'hunter22')

  await waitFor(() => expect(Object.fromEntries(new FormData(form))).toEqual({ password: 'hunter22' }))
})
