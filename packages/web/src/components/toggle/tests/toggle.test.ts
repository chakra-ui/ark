import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../../../../examples/toggle/basic.js'
import { mount as Controlled } from '../../../../examples/toggle/controlled.js'
import { mount as Disabled } from '../../../../examples/toggle/disabled.js'
import { mount as Indicator } from '../../../../examples/toggle/indicator.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

test('toggle flips aria-pressed and emits pressedchange on click', async () => {
  mount(Basic)
  const button = await screen.findByRole('button', { name: 'Bold' })
  const toggle = document.querySelector('ark-toggle')!
  const pressed: boolean[] = []
  toggle.addEventListener('pressedchange', (event) => pressed.push(event.detail.pressed))

  await waitFor(() => expect(button).toHaveAttribute('aria-pressed', 'false'))

  await user.click(button)
  await waitFor(() => expect(button).toHaveAttribute('aria-pressed', 'true'))
  expect(button).toHaveAttribute('data-pressed', '')

  await user.click(button)
  await waitFor(() => expect(button).toHaveAttribute('aria-pressed', 'false'))
  expect(pressed).toEqual([true, false])
})

test('controlled toggle waits for the pressed attribute', async () => {
  mount(Controlled)
  const toggle = document.querySelector('ark-toggle')!
  const button = await screen.findByRole('button', { name: 'Favorite' })
  toggle.addEventListener('pressedchange', (event) => event.stopImmediatePropagation(), { capture: true })

  await user.click(button)
  await waitFor(() => expect(button).toHaveAttribute('aria-pressed', 'false'))

  toggle.setAttribute('pressed', 'true')
  await waitFor(() => expect(button).toHaveAttribute('aria-pressed', 'true'))

  toggle.setAttribute('pressed', 'false')
  await waitFor(() => expect(button).toHaveAttribute('aria-pressed', 'false'))
})

test('disabled toggle does not change', async () => {
  mount(Disabled)
  const button = await screen.findByRole('button', { name: 'Bold' })

  await waitFor(() => expect(button).toBeDisabled())
  expect(button).toHaveAttribute('data-disabled', '')

  await user.click(button)
  expect(button).toHaveAttribute('aria-pressed', 'false')
})

test('indicator switches between pressed content and fallback', async () => {
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
