import type { Meta } from '@storybook/react'
import { Menu } from '../'
import { Portal } from '../../portal'
import './menu.css'

const meta: Meta = {
  title: 'Components / Menu / Nested',
}

export default meta

export const Basic = () => (
  <Menu.Root>
    <Menu.Trigger>Open menu</Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item value="new-tab">New Tab...</Menu.Item>
        <Menu.Item value="new-win">New Window...</Menu.Item>
        <Menu.Separator />
        <Menu.Root>
          <Menu.TriggerItem>Share &gt;</Menu.TriggerItem>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="twitter">Twitter</Menu.Item>
                <Menu.Item value="message">Message</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)

export const Advanced = () => {
  return (
    <Menu.Root>
      <Menu.Trigger>Open menu</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.ItemGroup id="radio-group">
            <Menu.ItemGroupLabel htmlFor="radio-group">Radio Group</Menu.ItemGroupLabel>
            <Menu.OptionItem type="radio" value="react" checked>
              <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
              <Menu.OptionItemText>React</Menu.OptionItemText>
            </Menu.OptionItem>
            <Menu.OptionItem type="radio" value="solid" checked>
              <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
              <Menu.OptionItemText>Solid</Menu.OptionItemText>
            </Menu.OptionItem>
            <Menu.OptionItem type="radio" value="vue" checked>
              <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
              <Menu.OptionItemText>Vue</Menu.OptionItemText>
            </Menu.OptionItem>
          </Menu.ItemGroup>
          <Menu.Root>
            <Menu.TriggerItem>Share &gt;</Menu.TriggerItem>
            <Portal>
              <Menu.Positioner>
                <Menu.Content>
                  <Menu.Item value="twitter">Twitter</Menu.Item>
                  <Menu.Item value="message">Message</Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}
