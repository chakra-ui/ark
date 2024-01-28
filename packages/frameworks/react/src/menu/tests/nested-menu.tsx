import { Menu } from '../'
import { Portal } from '../../portal'

export const NestedMenuComponentUnderTest = () => (
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
  </Menu.Root>
)
