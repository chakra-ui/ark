import type { Meta } from '@storybook/react'
import { Portal } from '@zag-js/react'
import { useState } from 'react'
import { Menu } from './'
import './menu.css'

type MenuType = typeof Menu

const meta: Meta<MenuType> = {
  title: 'Menu',
  component: Menu,
}

export default meta

export const Basic = () => (
  <Menu.Root>
    <Menu.Trigger>Open menu</Menu.Trigger>
    <Portal>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item id="search">Search</Menu.Item>
          <Menu.Item id="undo">Undo</Menu.Item>
          <Menu.Item id="delivery" disabled>
            Delivery
          </Menu.Item>
          <Menu.Item id="unlink">Unlink</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
)

export const Group = () => (
  <Menu.Root>
    <Menu.Trigger>Open menu</Menu.Trigger>
    <Portal>
      <Menu.Positioner>
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
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
)

export const Options = () => {
  const [value, setValue] = useState<Record<string, string | string[]>>({
    framework: '',
    libraries: [],
  })
  return (
    <Menu.Root
      value={value}
      onValueChange={(data) => {
        setValue((prev) => ({
          ...prev,
          [data.name]: data.value,
        }))
      }}
    >
      <Menu.Trigger>Open menu</Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.ItemGroup id="radio-group">
              <Menu.ItemGroupLabel htmlFor="radio-group">Radio Group</Menu.ItemGroupLabel>
              <Menu.OptionItem name="framework" type="radio" value="react">
                {({ isChecked }) => <>{isChecked ? '✅' : ''} React</>}
              </Menu.OptionItem>
              <Menu.OptionItem name="framework" type="radio" value="solid">
                {({ isChecked }) => <>{isChecked ? '✅' : ''} Solid</>}
              </Menu.OptionItem>
              <Menu.OptionItem name="framework" type="radio" value="vue">
                {({ isChecked }) => <>{isChecked ? '✅' : ''} Vue</>}
              </Menu.OptionItem>
            </Menu.ItemGroup>
            <Menu.ItemGroup id="checkbox-group">
              <Menu.ItemGroupLabel htmlFor="checkbox-group">Checkbox Group</Menu.ItemGroupLabel>
              <Menu.OptionItem name="libraries" type="checkbox" value="zag-js">
                {({ isChecked }) => <>{isChecked ? '✅' : ''} zag-js</>}
              </Menu.OptionItem>
              <Menu.OptionItem name="libraries" type="checkbox" value="ark">
                {({ isChecked }) => <>{isChecked ? '✅' : ''} ark</>}
              </Menu.OptionItem>
              <Menu.OptionItem name="libraries" type="checkbox" value="panda">
                {({ isChecked }) => <>{isChecked ? '✅' : ''} panda</>}
              </Menu.OptionItem>
              <Menu.OptionItem name="libraries" type="checkbox" value="chakra">
                {({ isChecked }) => <>{isChecked ? '✅' : ''} chakra</>}
              </Menu.OptionItem>
            </Menu.ItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

export const SubMenu = () => (
  <Menu.Root>
    <Menu.Trigger>Open menu</Menu.Trigger>
    <Portal>
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
    </Portal>
  </Menu.Root>
)

export const ComplexSubMenu = () => {
  const [value, setValue] = useState<Record<string, string | string[]>>({
    framework: '',
    libraries: [],
  })
  return (
    <Menu.Root
      value={value}
      onValueChange={(data) => {
        setValue((prev) => ({
          ...prev,
          [data.name]: data.value,
        }))
      }}
    >
      <Menu.Trigger>Open menu</Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.ItemGroup id="radio-group">
              <Menu.ItemGroupLabel htmlFor="radio-group">Radio Group</Menu.ItemGroupLabel>
              <Menu.OptionItem name="framework" type="radio" value="react">
                {({ isChecked }) => <>{isChecked ? '✅' : ''} React</>}
              </Menu.OptionItem>
              <Menu.OptionItem name="framework" type="radio" value="solid">
                {({ isChecked }) => <>{isChecked ? '✅' : ''} Solid</>}
              </Menu.OptionItem>
              <Menu.OptionItem name="framework" type="radio" value="vue">
                {({ isChecked }) => <>{isChecked ? '✅' : ''} Vue</>}
              </Menu.OptionItem>
            </Menu.ItemGroup>
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
      </Portal>
    </Menu.Root>
  )
}
