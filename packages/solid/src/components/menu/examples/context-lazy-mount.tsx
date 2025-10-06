import { Menu } from '@ark-ui/solid/menu'

export const ContextLazyMount = () => (
  <Menu.Root unmountOnExit lazyMount>
    <Menu.ContextTrigger>Right click this area</Menu.ContextTrigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value="react">React</Menu.Item>
        <Menu.Item value="solid">Solid</Menu.Item>
        <Menu.Item value="vue">Vue</Menu.Item>
        <Menu.Root unmountOnExit lazyMount>
          <Menu.TriggerItem>CSS Frameworks</Menu.TriggerItem>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="panda">Panda</Menu.Item>
              <Menu.Item value="tailwind">Tailwind</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)
