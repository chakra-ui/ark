import { Portal } from '@reach/portal'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { vi } from 'vitest'
import {
  Menu,
  MenuContent,
  MenuContextTrigger,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger,
  MenuTriggerItem,
} from '.'

describe('Menu', () => {
  it('should set correct aria attributes on disabled MenuItems', () => {
    render(
      <Menu>
        <MenuTrigger>
          <button>Open menu</button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem id="search">Search</MenuItem>
          <MenuItem id="undo">Undo</MenuItem>
          <MenuItem id="delivery" disabled>
            Delivery
          </MenuItem>
          <MenuItem id="unlink">Unlink</MenuItem>
        </MenuContent>
      </Menu>,
    )

    expect(screen.getByText('Delivery')).toHaveAttribute('aria-disabled', 'true')
  })

  it('should not fire onValueChange on disabled MenuItems', async () => {
    const onValueChange = vi.fn()

    render(
      <Menu onValueChange={onValueChange}>
        <MenuTrigger>
          <button>Open menu</button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem id="search">Search</MenuItem>
          <MenuItem id="undo">Undo</MenuItem>
          <MenuItem id="delivery" disabled>
            Delivery
          </MenuItem>
          <MenuItem id="unlink">Unlink</MenuItem>
        </MenuContent>
      </Menu>,
    )

    await user.click(screen.getByText('Delivery'))

    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('should apply correct role to MenuGroup', async () => {
    render(
      <Menu>
        <MenuTrigger>
          <button>Open menu</button>
        </MenuTrigger>
        <MenuContent>
          <MenuGroup id="group-1">
            <MenuGroupLabel htmlFor="group-1">Group 1</MenuGroupLabel>
            <MenuItem id="share">Share...</MenuItem>
            <MenuItem id="move">Move...</MenuItem>
          </MenuGroup>
          <MenuGroup id="group-2">
            <MenuGroupLabel htmlFor="group-2">Group 2</MenuGroupLabel>
            <MenuItem id="rename">Rename...</MenuItem>
            <MenuItem id="delete">Delete...</MenuItem>
          </MenuGroup>
        </MenuContent>
      </Menu>,
    )

    const button = screen.getByRole('button', { name: /open menu/i })

    await user.click(button)

    await waitFor(() => expect(screen.getAllByRole('group')).toHaveLength(2))
    expect(screen.getByText('Group 1').nextElementSibling).toBe(screen.getByText('Share...'))
  })

  it('should expose internal state as render prop', async () => {
    render(
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuTrigger>
              <button>{isOpen ? 'Close' : 'Open'} menu</button>
            </MenuTrigger>
            <MenuContent>
              <MenuItem id="download">Download</MenuItem>
              <MenuItem id="copy" onClick={() => alert('Kagebunshin')}>
                Create a Copy
              </MenuItem>
            </MenuContent>
          </>
        )}
      </Menu>,
    )

    const button = screen.getByRole('button', { name: /open menu/i })

    await user.click(button)
    await waitFor(() => expect(screen.getByText(/close menu/i)).toBeInTheDocument())

    await user.click(button)
    await waitFor(() => expect(screen.getByText(/open menu/i)).toBeInTheDocument())
  })

  it('should override menu item type', async () => {
    render(
      <Menu>
        <MenuTrigger>
          <button>Open menu</button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem id="submit" type="submit">
            Submit
          </MenuItem>
          <MenuItem id="button">Button</MenuItem>
        </MenuContent>
      </Menu>,
    )

    const submitOption = screen.getByText('Submit')
    expect(submitOption).toHaveAttribute('type', 'submit')
  })

  it('should accept a custom placement', async () => {
    render(
      <Menu dir="rtl" positioning={{ placement: 'left-start' }}>
        <MenuTrigger>
          <button>Open menu</button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem id="1">Pick me</MenuItem>
          <MenuItem id="2">No no, pick me</MenuItem>
        </MenuContent>
      </Menu>,
    )

    const button = screen.getByRole('button', { name: /open menu/i })
    await user.click(button)

    const menuList = screen.getByRole('menu')
    expect(menuList.getAttribute('data-placement')).toEqual('left-start')
  })

  describe('ContextMenu', () => {
    it('should open on context menu', async () => {
      render(
        <Menu>
          <MenuContextTrigger>
            <button>Open menu</button>
          </MenuContextTrigger>
          <MenuContent>
            <span>menu content</span>
          </MenuContent>
        </Menu>,
      )

      const button = screen.getByRole('button', { name: /open menu/i })
      fireEvent.contextMenu(button)
      await waitFor(() => expect(screen.getByText(/menu content/i)).toBeVisible())
    })
  })

  describe('NestedMenu', () => {
    it('should open on nested menu', async () => {
      render(
        <Menu>
          <MenuTrigger>
            <button>Open menu</button>
          </MenuTrigger>
          <Portal>
            <MenuPositioner>
              <MenuContent>
                <span>main menu content</span>
                <MenuSeparator />
                <Menu>
                  <MenuTriggerItem>Share...</MenuTriggerItem>
                  <Portal>
                    <MenuPositioner>
                      <MenuContent>
                        <span>nested menu content</span>
                        <MenuItem id="twitter">Twitter</MenuItem>
                        <MenuItem id="message">Message</MenuItem>
                      </MenuContent>
                    </MenuPositioner>
                  </Portal>
                </Menu>
              </MenuContent>
            </MenuPositioner>
          </Portal>
        </Menu>,
      )

      const button = screen.getByRole('button', { name: /open menu/i })
      await user.click(button)
      await waitFor(() => expect(screen.getByText(/main menu content/i)).toBeVisible())

      const nestedButton = screen.getByText(/Share/i)
      await user.click(nestedButton)
      await waitFor(() => expect(screen.getByText(/nested menu content/i)).toBeVisible())
    })
  })
})
