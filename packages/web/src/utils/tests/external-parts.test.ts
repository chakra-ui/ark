import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import '@ark-ui/web/dialog'
import '@ark-ui/web/popover'

const user = userEvent.setup()

const dialogContent = () => document.querySelector('ark-dialog-content')

const positioner = /* html */ `
  <ark-dialog-positioner for="external">
    <ark-dialog-content>
      <ark-dialog-title>External</ark-dialog-title>
      <button>First</button>
      <ark-dialog-close-trigger><button>Close</button></ark-dialog-close-trigger>
    </ark-dialog-content>
  </ark-dialog-positioner>`

test('a part moved out of its root still finds the root through its for attribute', async () => {
  document.body.innerHTML = /* html */ `
    <main>
      <ark-dialog id="external">
        <ark-dialog-trigger><button>Open</button></ark-dialog-trigger>
        ${positioner}
      </ark-dialog>
    </main>`

  const part = document.querySelector('ark-dialog-positioner')!
  document.body.append(part)
  const open = await screen.findByRole('button', { name: 'Open' })

  await user.click(open)

  const dialog = await screen.findByRole('dialog')
  await waitFor(() => expect(dialog).toBeVisible())
  expect(dialog).toHaveAccessibleName('External')
  expect(dialog).toHaveAttribute('data-dialog-content')
  expect(part.parentElement!.localName).toBe('body')

  await user.click(screen.getByRole('button', { name: 'Close' }))

  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  await waitFor(() => expect(open).toHaveFocus())
})

test('a part connects once the root it points at appears', async () => {
  document.body.innerHTML = `<div id="portal">${positioner}</div>`
  const root = document.createElement('ark-dialog')
  root.id = 'external'
  root.innerHTML = '<ark-dialog-trigger><button>Open</button></ark-dialog-trigger>'

  document.body.prepend(root)

  await waitFor(() => expect(dialogContent()).toHaveAttribute('data-dialog-content'))

  await user.click(await screen.findByRole('button', { name: 'Open' }))

  await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())

  await user.keyboard('{Escape}')

  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
})

test('a part ignores a root of a different component with the matching id', async () => {
  document.body.innerHTML = /* html */ `
    <ark-popover id="external"></ark-popover>
    ${positioner}`

  await document.querySelector('ark-popover')!.ready

  expect(dialogContent()).not.toHaveAttribute('data-dialog-content')
})
