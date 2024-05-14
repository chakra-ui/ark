import { Portal } from 'solid-js/web'
import { Menu } from '../..'

export const Nested = () => (
  <Menu.Root>
    <Menu.Trigger>Open menu</Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Root>
          <Menu.TriggerItem>JS Frameworks</Menu.TriggerItem>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="react">React</Menu.Item>
                <Menu.Item value="solid">Solid</Menu.Item>
                <Menu.Item value="vue">Vue</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
        <Menu.Root>
          <Menu.TriggerItem>CSS Frameworks</Menu.TriggerItem>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="panda">Panda</Menu.Item>
                <Menu.Item value="tailwind">Tailwind</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)
