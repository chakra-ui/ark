import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { Portal } from '@zag-js/react'
import { useState } from 'react'
import { vi } from 'vitest'
import {
  Menu,
  MenuContent,
  MenuContextTrigger,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuOptionItem,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger,
  MenuTriggerItem,
} from '.'

describe('Menu', () => {
  it('should set correct aria attributes on disabled MenuItems', () => {
    render(
      <Menu>
        <MenuTrigger>Open menu</MenuTrigger>
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
        <MenuTrigger>Open menu</MenuTrigger>
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

  it('should apply correct role to MenuItemGroup', async () => {
    render(
      <Menu>
        <MenuTrigger>Open menu</MenuTrigger>
        <MenuContent>
          <MenuItemGroup id="group-1">
            <MenuItemGroupLabel htmlFor="group-1">Group 1</MenuItemGroupLabel>
            <MenuItem id="share">Share...</MenuItem>
            <MenuItem id="move">Move...</MenuItem>
          </MenuItemGroup>
          <MenuItemGroup id="group-2">
            <MenuItemGroupLabel htmlFor="group-2">Group 2</MenuItemGroupLabel>
            <MenuItem id="rename">Rename...</MenuItem>
            <MenuItem id="delete">Delete...</MenuItem>
          </MenuItemGroup>
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
            <MenuTrigger>{isOpen ? 'Close' : 'Open'} menu</MenuTrigger>
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
        <MenuTrigger>Open menu</MenuTrigger>
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
        <MenuTrigger>Open menu</MenuTrigger>
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
          <MenuContextTrigger>Open menu</MenuContextTrigger>
          <MenuContent>menu content</MenuContent>
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
          <MenuTrigger>Open menu</MenuTrigger>
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

  describe('OptionGroups', () => {
    const ComponentUnderTest = () => {
      const [value, setValue] = useState<Record<string, string | string[]>>({
        framework: '',
        libraries: [],
      })
      return (
        <Menu
          value={value}
          onValueChange={(data) => {
            setValue((prev) => ({
              ...prev,
              [data.name]: data.value,
            }))
          }}
        >
          <MenuTrigger>Open menu</MenuTrigger>
          <Portal>
            <MenuPositioner>
              <MenuContent>
                <MenuItemGroup id="radio-group">
                  <MenuItemGroupLabel htmlFor="radio-group">Radio Group</MenuItemGroupLabel>
                  <MenuOptionItem name="framework" type="radio" value="react">
                    {({ isActive }) => <>{isActive ? '✅' : ''} React</>}
                  </MenuOptionItem>
                  <MenuOptionItem name="framework" type="radio" value="solid">
                    {({ isActive }) => <>{isActive ? '✅' : ''} Solid</>}
                  </MenuOptionItem>
                  <MenuOptionItem name="framework" type="radio" value="vue">
                    {({ isActive }) => <>{isActive ? '✅' : ''} Vue</>}
                  </MenuOptionItem>
                </MenuItemGroup>
                <MenuItemGroup id="checkbox-group">
                  <MenuItemGroupLabel htmlFor="checkbox-group">Checkbox Group</MenuItemGroupLabel>
                  <MenuOptionItem name="libraries" type="checkbox" value="zag-js">
                    {({ isActive }) => <>{isActive ? '✅' : ''} zag-js</>}
                  </MenuOptionItem>
                  <MenuOptionItem name="libraries" type="checkbox" value="ark">
                    {({ isActive }) => <>{isActive ? '✅' : ''} ark</>}
                  </MenuOptionItem>
                  <MenuOptionItem name="libraries" type="checkbox" value="panda">
                    {({ isActive }) => <>{isActive ? '✅' : ''} panda</>}
                  </MenuOptionItem>
                  <MenuOptionItem name="libraries" type="checkbox" value="chakra">
                    {({ isActive }) => <>{isActive ? '✅' : ''} chakra</>}
                  </MenuOptionItem>
                </MenuItemGroup>
              </MenuContent>
            </MenuPositioner>
          </Portal>
        </Menu>
      )
    }

    it('should select a radio option', async () => {
      render(<ComponentUnderTest />)
      const menuButton = screen.getByRole('button', { name: /open menu/i })
      await user.click(menuButton)

      const radioButton = screen.getByRole('menuitemradio', { name: /react/i })
      await user.click(radioButton)
      await waitFor(() => expect(radioButton).toHaveAttribute('aria-checked', 'true'))
    })

    it('should select a checkbox option', async () => {
      render(<ComponentUnderTest />)
      const menuButton = screen.getByRole('button', { name: /open menu/i })
      await user.click(menuButton)

      const checkboxButton1 = screen.getByRole('menuitemcheckbox', { name: /ark/i })
      await user.click(checkboxButton1)

      await user.click(menuButton)

      const checkboxButton2 = screen.getByRole('menuitemcheckbox', { name: /panda/i })
      await user.click(checkboxButton2)

      await waitFor(() => expect(checkboxButton1).toHaveAttribute('aria-checked', 'true'))
      await waitFor(() => expect(checkboxButton2).toHaveAttribute('aria-checked', 'true'))
    })
  })

  it('should control the open state', () => {
    render(
      <Menu isOpen>
        <MenuPositioner>
          <MenuContent>
            <span>main menu content</span>
          </MenuContent>
        </MenuPositioner>
      </Menu>,
    )
    const text = screen.getByText('main menu content')
    expect(text).toBeVisible()
  })
})
