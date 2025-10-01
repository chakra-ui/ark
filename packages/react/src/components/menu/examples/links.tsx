import { Menu } from '@ark-ui/react/menu'

export const Links = () => (
  <Menu.Root>
    <Menu.Trigger>Open menu</Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value="docs" asChild>
          <a href="https://ark-ui.com">Documentation</a>
        </Menu.Item>
        <Menu.Item value="github" asChild>
          <a href="https://github.com/chakra-ui/ark">GitHub</a>
        </Menu.Item>
        <Menu.Item value="twitter" asChild>
          <a href="https://twitter.com/ark_ui_">Twitter</a>
        </Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)
