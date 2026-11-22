import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../examples/basic.js'
import { mount as Disabled } from '../examples/disabled.js'
import { mount as Vertical } from '../examples/vertical.js'
import { mount } from '../../../test-utils.js'

const user = userEvent.setup()

const trigger = (name: string) =>
  Array.from(document.querySelectorAll<HTMLButtonElement>('ark-menu-trigger button')).find((button) =>
    button.textContent?.includes(name),
  )!

const menuitem = (name: string) => screen.getByRole('menuitem', { name, hidden: true })

const findMenubar = () =>
  waitFor(() => {
    const menubar = screen.getByRole('menubar')
    expect(menubar).toHaveAttribute('data-orientation')
    return menubar
  })

test('arrow keys move focus between the triggers of a horizontal menubar', async () => {
  mount(Basic)
  const menubar = await findMenubar()
  expect(menubar).toHaveAttribute('data-orientation', 'horizontal')
  trigger('File').focus()

  await user.keyboard('{ArrowRight}')

  await waitFor(() => expect(trigger('Edit')).toHaveFocus())
  expect(trigger('Edit')).toHaveAttribute('tabindex', '0')

  await user.keyboard('{ArrowRight}')

  await waitFor(() => expect(trigger('View')).toHaveFocus())

  await user.keyboard('{ArrowLeft}')

  await waitFor(() => expect(trigger('Edit')).toHaveFocus())
})

test('while a menu is open, ArrowRight and hovering switch to another menu', async () => {
  mount(Basic)
  await findMenubar()
  await user.click(trigger('File'))
  await waitFor(() => expect(menuitem('New File')).toBeVisible())

  await user.keyboard('{ArrowRight}')

  await waitFor(() => expect(menuitem('Undo')).toBeVisible())
  expect(menuitem('New File')).not.toBeVisible()

  await user.hover(trigger('View'))

  await waitFor(() => expect(menuitem('Zoom In')).toBeVisible())
  expect(menuitem('Undo')).not.toBeVisible()
})

test('Escape closes the open menu and returns focus to its trigger', async () => {
  mount(Basic)
  const menubar = await findMenubar()
  trigger('Edit').focus()
  await user.keyboard('{ArrowDown}')
  await waitFor(() => expect(menuitem('Undo')).toBeVisible())

  await user.keyboard('{Escape}')

  await waitFor(() => expect(menuitem('Undo')).not.toBeVisible())
  await waitFor(() => expect(trigger('Edit')).toHaveFocus())
  expect(menubar).toHaveAttribute('data-has-open-menu', 'false')
})

test('a vertical menubar moves between triggers with ArrowDown', async () => {
  mount(Vertical)
  await findMenubar()
  trigger('Account').focus()

  await user.keyboard('{ArrowDown}')

  await waitFor(() => expect(trigger('Workspace')).toHaveFocus())
})

test('a disabled menubar disables its triggers', async () => {
  mount(Disabled)

  const menubar = await findMenubar()

  await waitFor(() => expect(menubar).toHaveAttribute('data-disabled', ''))
  expect(trigger('File')).toBeDisabled()
})
