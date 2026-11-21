import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../../../../examples/dialog/basic.js'
import { mount as Portal } from '../../../../examples/dialog/portal.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const findTrigger = async () => {
  const button = await screen.findByRole('button', { name: 'Open Dialog' })
  await waitFor(() => expect(button).toBeInstanceOf(HTMLButtonElement))
  return screen.getByRole('button', { name: 'Open Dialog' })
}

test('Escape closes the dialog and focus returns to the trigger', async () => {
  mount(Basic)
  const trigger = await findTrigger()
  await user.click(trigger)
  await waitFor(() => expect(screen.getByRole('dialog')).toBeVisible())

  await user.keyboard('{Escape}')

  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  await waitFor(() => expect(trigger).toHaveFocus())
})

test('a dialog rendered in a portal opens, keeps Tab inside and closes', async () => {
  mount(Portal)
  const trigger = await findTrigger()
  expect(document.querySelectorAll('.portal ark-dialog-content')).toHaveLength(1)

  await user.click(trigger)

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
  await waitFor(() => expect(trigger).toHaveFocus())
})
