import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import '@ark-ui/web/dialog'
import { mount } from '../../test-utils.js'

const dialog = (attributes = '') => /* html */ `
  <ark-dialog id="profile" ${attributes}>
    <ark-dialog-trigger><button>Open</button></ark-dialog-trigger>
    <ark-dialog-positioner>
      <ark-dialog-content><ark-dialog-title>Profile</ark-dialog-title></ark-dialog-content>
    </ark-dialog-positioner>
  </ark-dialog>`

const logs = () => {
  const spy = vi.spyOn(console, 'debug').mockImplementation(() => {})
  onTestFinished(() => spy.mockRestore())
  return () => spy.mock.calls.map(([message]) => String(message))
}

test('debug logs props, state transitions and events', async () => {
  const messages = logs()
  const user = userEvent.setup()
  mount((root) => {
    root.innerHTML = dialog('debug')
  })

  await user.click(await screen.findByRole('button', { name: 'Open' }))
  await waitFor(() => expect(messages()).toContain('[ark] ark-dialog#profile state closed → open'))

  expect(messages()).toContain('[ark] ark-dialog#profile props')
  expect(messages()).toContain('[ark] ark-dialog#profile event openchange')
})

test('debug on an ancestor applies to every root inside it', async () => {
  const messages = logs()
  const user = userEvent.setup()
  mount((root) => {
    root.innerHTML = /* html */ `<div debug>${dialog()}</div>`
  })

  await user.click(await screen.findByRole('button', { name: 'Open' }))
  await waitFor(() => expect(messages()).toContain('[ark] ark-dialog#profile event openchange'))
})

test('nothing is logged without debug', async () => {
  const messages = logs()
  const user = userEvent.setup()
  mount((root) => {
    root.innerHTML = dialog()
  })

  await user.click(await screen.findByRole('button', { name: 'Open' }))
  await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())

  expect(messages()).toEqual([])
})
