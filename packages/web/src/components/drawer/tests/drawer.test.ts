import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../../../../examples/drawer/basic.js'
import { mount as Controlled } from '../../../../examples/drawer/controlled.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

test('trigger opens the drawer and Escape closes it, restoring focus', async () => {
  mount(Basic)
  const trigger = await screen.findByRole('button', { name: 'Open' })

  await user.click(trigger)
  const dialog = await screen.findByRole('dialog')
  await waitFor(() => expect(dialog).toBeVisible())
  expect(trigger).toHaveAttribute('aria-expanded', 'true')
  expect(dialog).toHaveAccessibleName('Drawer Title')
  await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true))

  await user.keyboard('{Escape}')
  await waitFor(() => expect(dialog).not.toBeVisible())
  expect(trigger).toHaveAttribute('aria-expanded', 'false')
  await waitFor(() => expect(trigger).toHaveFocus())
})

test('close trigger closes the drawer and emits openchange', async () => {
  mount(Basic)
  const drawer = document.querySelector('ark-drawer')!
  const changes: boolean[] = []
  drawer.addEventListener('openchange', (event) => changes.push(event.detail.open))

  await user.click(await screen.findByRole('button', { name: 'Open' }))
  const dialog = await screen.findByRole('dialog')
  await waitFor(() => expect(dialog).toBeVisible())
  expect(changes.at(-1)).toBe(true)

  await user.click(screen.getByRole('button', { name: 'Close' }))
  await waitFor(() => expect(dialog).not.toBeVisible())
  expect(changes.at(-1)).toBe(false)
})

test('controlled drawer waits for the open attribute', async () => {
  mount(Controlled)
  const drawer = document.querySelector('ark-drawer')!

  await user.click(await screen.findByRole('button', { name: 'Open Drawer' }))
  const dialog = await screen.findByRole('dialog')
  await waitFor(() => expect(dialog).toBeVisible())
  expect(document.querySelector('output')).toHaveTextContent('Open: true')

  drawer.addEventListener('openchange', (event) => event.stopImmediatePropagation(), { capture: true })
  await user.click(screen.getByRole('button', { name: 'Close' }))
  await new Promise((resolve) => setTimeout(resolve, 50))
  expect(dialog).toBeVisible()

  drawer.setAttribute('open', 'false')
  await waitFor(() => expect(dialog).not.toBeVisible())
})
