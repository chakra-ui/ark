import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../examples/basic.js'
import { mount as Controlled } from '../examples/controlled.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const findOpenDrawer = async () => {
  const dialog = await screen.findByRole('dialog')
  await waitFor(() => expect(dialog).toBeVisible())
  return dialog
}

test('the trigger opens the drawer and Escape closes it, returning focus', async () => {
  mount(Basic)
  const trigger = await screen.findByRole('button', { name: 'Open' })

  await user.click(trigger)

  const dialog = await findOpenDrawer()
  expect(trigger).toHaveAttribute('aria-expanded', 'true')
  expect(dialog).toHaveAccessibleName('Drawer Title')
  await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true))

  await user.keyboard('{Escape}')

  await waitFor(() => expect(dialog).not.toBeVisible())
  expect(trigger).toHaveAttribute('aria-expanded', 'false')
  await waitFor(() => expect(trigger).toHaveFocus())
})

test('the close button closes the drawer and each change is reported', async () => {
  mount(Basic)
  const drawer = document.querySelector('ark-drawer')!
  const changes: boolean[] = []
  drawer.addEventListener('openchange', (event) => changes.push(event.detail.open))

  await user.click(await screen.findByRole('button', { name: 'Open' }))

  const dialog = await findOpenDrawer()
  expect(changes.at(-1)).toBe(true)

  await user.click(screen.getByRole('button', { name: 'Close' }))

  await waitFor(() => expect(dialog).not.toBeVisible())
  expect(changes.at(-1)).toBe(false)
})

test('a controlled drawer stays open until its open attribute changes', async () => {
  mount(Controlled)
  const drawer = document.querySelector('ark-drawer')!
  await user.click(await screen.findByRole('button', { name: 'Open Drawer' }))
  const dialog = await findOpenDrawer()
  expect(document.querySelector('output')).toHaveTextContent('Open: true')
  const requested: boolean[] = []
  drawer.addEventListener(
    'openchange',
    (event) => {
      requested.push(event.detail.open)
      event.stopImmediatePropagation()
    },
    { capture: true },
  )

  await user.click(screen.getByRole('button', { name: 'Close' }))

  await waitFor(() => expect(requested).toEqual([false]))
  expect(dialog).toBeVisible()

  drawer.setAttribute('open', 'false')

  await waitFor(() => expect(dialog).not.toBeVisible())
})
