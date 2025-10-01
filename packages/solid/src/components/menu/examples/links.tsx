import { Menu } from '@ark-ui/solid/menu'

export const Links = () => (
  <Menu.Root>
    <Menu.Trigger>Open menu</Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value="docs" asChild={(props) => <a href="https://ark-ui.com" {...props()} />}>
          Documentation
        </Menu.Item>
        <Menu.Item value="github" asChild={(props) => <a href="https://github.com/chakra-ui/ark" {...props()} />}>
          GitHub
        </Menu.Item>
        <Menu.Item value="twitter" asChild={(props) => <a href="https://twitter.com/ark_ui_" {...props()} />}>
          Twitter
        </Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)
