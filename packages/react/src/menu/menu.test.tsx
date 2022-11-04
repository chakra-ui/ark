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
  NestedMenu,
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

    expect(screen.getByText('Delivery')).toBeDisabled()
  })

  it('should not fire onClick on disabled MenuItem', async () => {
    const onClick = vi.fn()

    render(
      <Menu>
        <MenuTrigger>
          <button>Open menu</button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem id="search">Search</MenuItem>
          <MenuItem id="undo">Undo</MenuItem>
          <MenuItem id="delivery" disabled onClick={onClick}>
            Delivery
          </MenuItem>
          <MenuItem id="unlink">Unlink</MenuItem>
        </MenuContent>
      </Menu>,
    )

    await user.click(screen.getByText('Delivery'))

    expect(onClick).not.toHaveBeenCalled()
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

  it.skip('should flip direction for MenuContent in rtl', async () => {
    // test fails, and passing `positioning={{ placement: 'bottom-start' }}` leads to max callstack
    render(
      <Menu dir="rtl">
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
    expect(menuList.getAttribute('data-placement')).toEqual('top-start')
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
          <MenuContent>
            <span>main menu content</span>
            <MenuSeparator />
            <NestedMenu>
              <MenuItem id="share">Share...</MenuItem>
              <MenuPositioner>
                <MenuContent>
                  <span>nested menu content</span>
                  <MenuItem id="twitter">Twitter</MenuItem>
                  <MenuItem id="message">Message</MenuItem>
                </MenuContent>
              </MenuPositioner>
            </NestedMenu>
          </MenuContent>
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
