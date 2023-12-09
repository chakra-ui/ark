import { menuAnatomy } from '@ark-ui/anatomy'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { useState } from 'react'
import { vi } from 'vitest'
import { Portal } from '../portal'
import { getParts } from '../setup-test'
import { Menu, type MenuProps } from './'

const ComponentUnderTest = (props: MenuProps) => (
  <Menu.Root {...props}>
    <Menu.Trigger>Open menu</Menu.Trigger>
    <Menu.Positioner data-testid="positioner">
      <Menu.Content>
        <span>main menu content</span>
        <Menu.Item id="search">Search</Menu.Item>
        <Menu.Item id="undo">Undo</Menu.Item>
        <Menu.Item id="delivery" disabled>
          Delivery
        </Menu.Item>
        <Menu.Item id="unlink">Unlink</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)

describe('Menu', () => {
  it.skip.each(getParts(menuAnatomy))('should render part! %s', async (part) => {
    render(<ComponentUnderTest />)
    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector(part)).toBeInTheDocument()
  })

  // it.skip.each(getExports(menuAnatomy))('should export %s', async (part) => {
  //   expect(Menu[part]).toBeDefined()
  // })

  it('should set correct aria attributes on disabled MenuItems', () => {
    render(<ComponentUnderTest />)

    expect(screen.getByText('Delivery')).toHaveAttribute('aria-disabled', 'true')
  })

  it('should not fire onValueChange on disabled MenuItems', async () => {
    const onValueChange = vi.fn()

    render(<ComponentUnderTest onValueChange={onValueChange} />)

    await user.click(screen.getByText('Delivery'))
    expect(onValueChange).not.toHaveBeenCalled()
  })

  it('should apply correct role to MenuItemGroup', async () => {
    render(
      <Menu.Root>
        <Menu.Trigger>Open menu</Menu.Trigger>
        <Menu.Content>
          <Menu.ItemGroup id="group-1">
            <Menu.ItemGroupLabel htmlFor="group-1">Group 1</Menu.ItemGroupLabel>
            <Menu.Item id="share">Share...</Menu.Item>
            <Menu.Item id="move">Move...</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup id="group-2">
            <Menu.ItemGroupLabel htmlFor="group-2">Group 2</Menu.ItemGroupLabel>
            <Menu.Item id="rename">Rename...</Menu.Item>
            <Menu.Item id="delete">Delete...</Menu.Item>
          </Menu.ItemGroup>
        </Menu.Content>
      </Menu.Root>,
    )

    const button = screen.getByRole('button', { name: /open menu/i })

    await user.click(button)

    await waitFor(() => expect(screen.getAllByRole('group')).toHaveLength(2))
    expect(screen.getByText('Group 1').nextElementSibling).toBe(screen.getByText('Share...'))
  })

  it('should expose internal state as render prop', async () => {
    render(
      <Menu.Root>
        {({ isOpen }) => (
          <>
            <Menu.Trigger>{isOpen ? 'Close' : 'Open'} menu</Menu.Trigger>
            <Menu.Content>
              <Menu.Item id="download">Download</Menu.Item>
              <Menu.Item id="copy" onClick={() => alert('Kagebunshin')}>
                Create a Copy
              </Menu.Item>
            </Menu.Content>
          </>
        )}
      </Menu.Root>,
    )

    const button = screen.getByRole('button', { name: /open menu/i })

    await user.click(button)
    await screen.findByText(/close menu/i)

    await user.click(button)
    await screen.findByText(/open menu/i)
  })

  it('should accept a custom placement', async () => {
    render(<ComponentUnderTest dir="rtl" positioning={{ placement: 'left-start' }} />)

    const button = screen.getByRole('button', { name: /open menu/i })
    await user.click(button)

    const menuList = screen.getByRole('menu')
    expect(menuList).toHaveAttribute('data-placement', 'left-start')
  })

  it('should control the open state', async () => {
    render(<ComponentUnderTest open />)

    const text = await screen.findByText('main menu content')
    expect(text).toBeVisible()
  })

  it('should be able to lazy mount', async () => {
    render(<ComponentUnderTest lazyMount />)

    const menutrigger = screen.getByRole('button', { name: 'Open menu' })
    expect(screen.queryByTestId('positioner')).not.toBeInTheDocument()
    expect(menutrigger).not.toHaveAttribute('aria-controls')

    await user.click(menutrigger)
    expect(screen.getByTestId('positioner')).toBeInTheDocument()
    expect(menutrigger).toHaveAttribute('aria-controls')
  })

  describe('ContextMenu', () => {
    it('should open on context menu', async () => {
      render(
        <Menu.Root>
          <Menu.ContextTrigger>Open menu</Menu.ContextTrigger>
          <Menu.Content>menu content</Menu.Content>
        </Menu.Root>,
      )

      const button = screen.getByRole('button', { name: /open menu/i })

      fireEvent.contextMenu(button)
      await waitFor(() => expect(screen.getByText(/menu content/i)).toBeVisible())
    })
  })

  describe('NestedMenu', () => {
    it('should open on nested menu', async () => {
      render(
        <Menu.Root>
          <Menu.Trigger>Open menu</Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <span>main menu content</span>
                <Menu.Separator />
                <Menu.Root>
                  <Menu.TriggerItem>Share...</Menu.TriggerItem>
                  <Portal>
                    <Menu.Positioner>
                      <Menu.Content>
                        <span>nested menu content</span>
                        <Menu.Item id="twitter">Twitter</Menu.Item>
                        <Menu.Item id="message">Message</Menu.Item>
                      </Menu.Content>
                    </Menu.Positioner>
                  </Portal>
                </Menu.Root>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>,
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
        <Menu.Root
          value={value}
          onValueChange={(data) => {
            setValue((prev) => ({
              ...prev,
              [data.name]: data.value,
            }))
          }}
        >
          <Menu.Trigger>Open menu</Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.ItemGroup id="radio-group">
                  <Menu.ItemGroupLabel htmlFor="radio-group">Radio Group</Menu.ItemGroupLabel>
                  <Menu.OptionItem name="framework" type="radio" value="react">
                    {({ isChecked }) => <>{isChecked ? '✅' : ''} React</>}
                  </Menu.OptionItem>
                  <Menu.OptionItem name="framework" type="radio" value="solid">
                    {({ isChecked }) => <>{isChecked ? '✅' : ''} Solid</>}
                  </Menu.OptionItem>
                  <Menu.OptionItem name="framework" type="radio" value="vue">
                    {({ isChecked }) => <>{isChecked ? '✅' : ''} Vue</>}
                  </Menu.OptionItem>
                </Menu.ItemGroup>
                <Menu.ItemGroup id="checkbox-group">
                  <Menu.ItemGroupLabel htmlFor="checkbox-group">Checkbox Group</Menu.ItemGroupLabel>
                  <Menu.OptionItem name="libraries" type="checkbox" value="zag-js">
                    {({ isChecked }) => <>{isChecked ? '✅' : ''} zag-js</>}
                  </Menu.OptionItem>
                  <Menu.OptionItem name="libraries" type="checkbox" value="ark">
                    {({ isChecked }) => <>{isChecked ? '✅' : ''} ark</>}
                  </Menu.OptionItem>
                  <Menu.OptionItem name="libraries" type="checkbox" value="panda">
                    {({ isChecked }) => <>{isChecked ? '✅' : ''} panda</>}
                  </Menu.OptionItem>
                  <Menu.OptionItem name="libraries" type="checkbox" value="chakra">
                    {({ isChecked }) => <>{isChecked ? '✅' : ''} chakra</>}
                  </Menu.OptionItem>
                </Menu.ItemGroup>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
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
})
