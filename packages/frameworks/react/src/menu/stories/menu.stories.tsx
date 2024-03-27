import type { Meta } from '@storybook/react'
import { useState } from 'react'
import { Menu } from '../'
import './menu.css'

const meta: Meta = {
  title: 'Components / Menu / Menu',
}

export default meta

export const Basic = () => (
  <Menu.Root>
    <Menu.Trigger>
      Open menu <Menu.Indicator>➡️</Menu.Indicator>
    </Menu.Trigger>
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
  </Menu.Root>
)

export const Controlled = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>Trigger from the outside</button>
      <Menu.Root open={isOpen} onSelect={(id) => console.log(id)}>
        <Menu.Trigger>
          Open menu <Menu.Indicator>▾</Menu.Indicator>
        </Menu.Trigger>
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
      </Menu.Root>
    </>
  )
}

export const Group = () => (
  <Menu.Root>
    <Menu.Trigger>Open menu</Menu.Trigger>
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
  </Menu.Root>
)

export const Separator = () => (
  <Menu.Root>
    <Menu.Trigger>Open menu</Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.Item id="search">Search</Menu.Item>
        <Menu.Item id="undo">Undo</Menu.Item>
        <Menu.Separator />
        <Menu.Item id="delivery" disabled>
          Delivery
        </Menu.Item>
        <Menu.Item id="unlink">Unlink</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
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
      <Menu.Positioner>
        <Menu.Content>
          <Menu.ItemGroup id="radio-group">
            <Menu.ItemGroupLabel htmlFor="radio-group">Radio Group</Menu.ItemGroupLabel>
            <Menu.OptionItem name="framework" type="radio" value="react">
              <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
              <Menu.OptionItemText>React</Menu.OptionItemText>
            </Menu.OptionItem>
            <Menu.OptionItem name="framework" type="radio" value="solid">
              <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
              <Menu.OptionItemText>Solid</Menu.OptionItemText>
            </Menu.OptionItem>
            <Menu.OptionItem name="framework" type="radio" value="vue">
              <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
              <Menu.OptionItemText>Vue</Menu.OptionItemText>
            </Menu.OptionItem>
          </Menu.ItemGroup>
          <Menu.ItemGroup id="checkbox-group">
            <Menu.ItemGroupLabel htmlFor="checkbox-group">Checkbox Group</Menu.ItemGroupLabel>
            <Menu.OptionItem name="libraries" type="checkbox" value="zag-js">
              <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
              <Menu.OptionItemText>Zag.js</Menu.OptionItemText>
            </Menu.OptionItem>
            <Menu.OptionItem name="libraries" type="checkbox" value="ark">
              <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
              <Menu.OptionItemText>Ark UI</Menu.OptionItemText>
            </Menu.OptionItem>
            <Menu.OptionItem name="libraries" type="checkbox" value="panda">
              <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
              <Menu.OptionItemText>Panda CSS</Menu.OptionItemText>
            </Menu.OptionItem>
            <Menu.OptionItem name="libraries" type="checkbox" value="chakra">
              <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
              <Menu.OptionItemText>Chakra UI</Menu.OptionItemText>
            </Menu.OptionItem>
          </Menu.ItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}
