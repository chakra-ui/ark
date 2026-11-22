import { screen } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Autofocus } from '../examples/autofocus.js'
import { mount as Basic } from '../examples/basic.js'
import { mount as InitialFocus } from '../examples/initial-focus.js'
import { mount } from '../../../test-utils.js'

import '@ark-ui/web/focus-trap'

const user = userEvent.setup()

test('starting the trap focuses the first field and keeps Tab inside', async () => {
  mount(Basic)

  await user.click(screen.getByRole('button', { name: 'Start Trap' }))
  await vi.waitFor(() => expect(screen.getByPlaceholderText('input')).toHaveFocus())

  await user.tab()
  expect(screen.getByPlaceholderText('textarea')).toHaveFocus()
  await user.tab()
  expect(screen.getByRole('button', { name: 'End Trap' })).toHaveFocus()
  await user.tab()
  expect(screen.getByPlaceholderText('input')).toHaveFocus()
})

test('ending the trap lets focus leave', async () => {
  mount(Basic)
  const trap = document.querySelector('ark-focus-trap')!

  await user.click(screen.getByRole('button', { name: 'Start Trap' }))
  await vi.waitFor(() => expect(trap.active).toBe(true))

  await user.click(screen.getByRole('button', { name: 'End Trap' }))
  expect(trap.active).toBe(false)
  expect(trap).toHaveAttribute('disabled')
})

test('initial-focus picks the element that receives focus', async () => {
  mount(InitialFocus)

  await user.click(screen.getByRole('button', { name: 'Start Trap' }))

  await vi.waitFor(() => expect(screen.getByPlaceholderText('Second input (initial focus)')).toHaveFocus())
})

test('an autofocus field receives focus and removing the trap returns focus to set-return-focus', async () => {
  mount(Autofocus)
  const toggle = screen.getByRole('button', { name: 'Start Trap' })

  await user.click(toggle)
  await vi.waitFor(() => expect(screen.getByPlaceholderText('Autofocused input')).toHaveFocus())

  await user.click(screen.getAllByRole('button', { name: 'End Trap' })[1])
  await vi.waitFor(() => expect(toggle).toHaveFocus())
  expect(document.querySelector('ark-focus-trap')).toBeNull()
})

test('activate and deactivate events fire', async () => {
  mount(Basic)
  const trap = document.querySelector('ark-focus-trap')!
  const onActivate = vi.fn()
  const onDeactivate = vi.fn()
  trap.addEventListener('activate', onActivate)
  trap.addEventListener('deactivate', onDeactivate)

  trap.disabled = false
  await vi.waitFor(() => expect(onActivate).toHaveBeenCalledTimes(1))

  trap.disabled = true
  expect(onDeactivate).toHaveBeenCalledTimes(1)
})

test('focus returns to the previously focused element when the trap ends', async () => {
  document.body.innerHTML = /* html */ `
    <button>Outside</button>
    <ark-focus-trap disabled><button>Inside</button></ark-focus-trap>`
  const outside = screen.getByRole('button', { name: 'Outside' })
  const trap = document.querySelector('ark-focus-trap')!

  outside.focus()
  trap.disabled = false
  await vi.waitFor(() => expect(screen.getByRole('button', { name: 'Inside' })).toHaveFocus())

  trap.disabled = true
  await vi.waitFor(() => expect(outside).toHaveFocus())
})
