import { Menu, type MenuProps } from '../'

export const ComponentUnderTest = (props: MenuProps) => (
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
