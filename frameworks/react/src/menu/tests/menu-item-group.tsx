import { Menu } from '../'

export const MenuItemGroupComponentUnderTest = () => (
  <Menu.Root>
    <Menu.Trigger>Open menu</Menu.Trigger>
    <Menu.Content>
      <Menu.ItemGroup>
        <Menu.ItemGroupLabel>Group 1</Menu.ItemGroupLabel>
        <Menu.Item value="share">Share...</Menu.Item>
        <Menu.Item value="move">Move...</Menu.Item>
      </Menu.ItemGroup>
      <Menu.ItemGroup>
        <Menu.ItemGroupLabel>Group 2</Menu.ItemGroupLabel>
        <Menu.Item value="rename">Rename...</Menu.Item>
        <Menu.Item value="delete">Delete...</Menu.Item>
      </Menu.ItemGroup>
    </Menu.Content>
  </Menu.Root>
)
