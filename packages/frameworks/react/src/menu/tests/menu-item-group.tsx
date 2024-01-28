import { Menu } from '../'

export const MenuItemGroupComponentUnderTest = () => (
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
  </Menu.Root>
)
