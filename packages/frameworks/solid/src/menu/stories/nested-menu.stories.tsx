import { createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import type { Meta } from 'storybook-solidjs'
import { Menu } from '../'
import './menu.css'

type MenuType = typeof Menu

const meta: Meta<MenuType> = {
  title: 'NestedMenu',
  component: Menu,
}

export default meta

export const Basic = () => (
  <Menu.Root>
    <Menu.Trigger>Open menu</Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item id="new-tab">New Tab...</Menu.Item>
        <Menu.Item id="new-win">New Window...</Menu.Item>
        <Menu.Separator />
        <Menu>
          <Menu.TriggerItem>Share &gt;</Menu.TriggerItem>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item id="twitter">Twitter</Menu.Item>
                <Menu.Item id="message">Message</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)

export const Advanced = () => {
  const [value, setValue] = createSignal<Record<string, string | string[]>>({
    framework: '',
    libraries: [],
  })
  return (
    <Menu.Root
      value={value()}
      onValueChange={(data) => {
        setValue((prev) => ({
          ...prev,
          [data.name]: data.value,
        }))
      }}
    >
      <Menu.Trigger>Open menu</Menu.Trigger>{' '}
      <Menu.Positioner>
        <Menu.Content>
          <Menu.ItemGroup id="radio-group">
            <Menu.ItemGroupLabel for="radio-group">Radio Group</Menu.ItemGroupLabel>
            <Menu.OptionItem name="framework" type="radio" value="react">
              {(itemState) => <>{itemState().isChecked ? '✅' : ''} React</>}
            </Menu.OptionItem>
            <Menu.OptionItem name="framework" type="radio" value="solid">
              {(itemState) => <>{itemState().isChecked ? '✅' : ''} Solid</>}
            </Menu.OptionItem>
            <Menu.OptionItem name="framework" type="radio" value="vue">
              {(itemState) => <>{itemState().isChecked ? '✅' : ''} Vue</>}
            </Menu.OptionItem>
          </Menu.ItemGroup>
          <Menu>
            <Portal>
              <Menu.TriggerItem>Share &gt;</Menu.TriggerItem>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item id="twitter">Twitter</Menu.Item>
                  <Menu.Item id="message">Message</Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}
