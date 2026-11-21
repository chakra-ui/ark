import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../../../../examples/dialog/basic.js'
import { mount as Portal } from '../../../../examples/dialog/portal.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const trigger = async () => {
  const button = await screen.findByRole('button', { name: 'Open Dialog' })
  await waitFor(() => expect(button).toBeInstanceOf(HTMLButtonElement))

  return screen.getByRole('button', { name: 'Open Dialog' })
}

test('dialog supports keyboard dismissal and restores trigger focus', async () => {
  mount(Basic)
  const button = await trigger()

  await user.click(button)
  await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())

  await user.keyboard('{Escape}')
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  await waitFor(() => expect(button).toHaveFocus())
})

test('portalled dialog content opens, traps focus and closes', async () => {
  mount(Portal)
  const button = await trigger()

  expect(document.querySelectorAll('.portal ark-dialog-content')).toHaveLength(1)

  await user.click(button)
  const dialog = await screen.findByRole('dialog')
  await waitFor(() => expect(dialog).toBeVisible())
  expect(dialog).toHaveAccessibleName('Portalled Dialog')

  screen.getByRole('button', { name: 'Confirm' }).focus()

  for (let i = 0; i < 3; i++) {
    await user.tab()
    expect(dialog.contains(document.activeElement)).toBe(true)
  }

  await user.keyboard('{Escape}')
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  await waitFor(() => expect(button).toHaveFocus())
})
