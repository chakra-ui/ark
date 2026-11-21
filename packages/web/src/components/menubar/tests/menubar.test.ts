import { screen, waitFor } from '@testing-library/dom'
import userEvent from '@testing-library/user-event'

import { mount as Basic } from '../../../../examples/menubar/basic.js'
import { mount as Disabled } from '../../../../examples/menubar/disabled.js'
import { mount as Vertical } from '../../../../examples/menubar/vertical.js'
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

test('menubar moves focus between triggers and skips a disabled one', async () => {
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

test('menubar switches to the next menu with ArrowRight while one is open', async () => {
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

test('menubar closes on Escape and returns focus to the trigger', async () => {
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

test('vertical menubar navigates with ArrowDown and a disabled menubar disables its triggers', async () => {
  const root = mount(Vertical)
  await findMenubar()

  trigger('Account').focus()
  await user.keyboard('{ArrowDown}')
  await waitFor(() => expect(trigger('Workspace')).toHaveFocus())

  root.remove()
  mount(Disabled)
  const menubar = await findMenubar()

  await waitFor(() => expect(menubar).toHaveAttribute('data-disabled', ''))
  expect(trigger('File')).toBeDisabled()
})
