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
        <Menu.Item value="search">Search</Menu.Item>
        <Menu.Item value="undo">Undo</Menu.Item>
        <Menu.Item value="delivery" disabled>
          Delivery
        </Menu.Item>
        <Menu.Item value="unlink">Unlink</Menu.Item>
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
            <Menu.Item value="search">Search</Menu.Item>
            <Menu.Item value="undo">Undo</Menu.Item>
            <Menu.Item value="delivery" disabled>
              Delivery
            </Menu.Item>
            <Menu.Item value="unlink">Unlink</Menu.Item>
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
          <Menu.Item value="share">Share...</Menu.Item>
          <Menu.Item value="move">Move...</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup id="group-2">
          <Menu.ItemGroupLabel htmlFor="group-2">Group 2</Menu.ItemGroupLabel>
          <Menu.Item value="rename">Rename...</Menu.Item>
          <Menu.Item value="delete">Delete...</Menu.Item>
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
        <Menu.Item value="search">Search</Menu.Item>
        <Menu.Item value="undo">Undo</Menu.Item>
        <Menu.Separator />
        <Menu.Item value="delivery" disabled>
          Delivery
        </Menu.Item>
        <Menu.Item value="unlink">Unlink</Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)

export const Options = () => {
  return (
    <Menu.Root>
      <Menu.Trigger>Open menu</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.ItemGroup id="radio-group">
            <Menu.ItemGroupLabel htmlFor="radio-group">Radio Group</Menu.ItemGroupLabel>
            <Menu.OptionItem type="radio" value="react" checked={false}>
              <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
              <Menu.OptionItemText>React</Menu.OptionItemText>
            </Menu.OptionItem>
            <Menu.OptionItem type="radio" value="solid" checked={false}>
              <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
              <Menu.OptionItemText>Solid</Menu.OptionItemText>
            </Menu.OptionItem>
            <Menu.OptionItem type="radio" value="vue" checked={false}>
              <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
              <Menu.OptionItemText>Vue</Menu.OptionItemText>
            </Menu.OptionItem>
          </Menu.ItemGroup>
          <Menu.ItemGroup id="checkbox-group">
            <Menu.ItemGroupLabel htmlFor="checkbox-group">Checkbox Group</Menu.ItemGroupLabel>
            <Menu.OptionItem type="checkbox" value="zag-js" checked={false}>
              <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
              <Menu.OptionItemText>Zag.js</Menu.OptionItemText>
            </Menu.OptionItem>
            <Menu.OptionItem type="checkbox" value="ark" checked={false}>
              <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
              <Menu.OptionItemText>Ark UI</Menu.OptionItemText>
            </Menu.OptionItem>
            <Menu.OptionItem type="checkbox" value="panda" checked={false}>
              <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
              <Menu.OptionItemText>Panda CSS</Menu.OptionItemText>
            </Menu.OptionItem>
            <Menu.OptionItem type="checkbox" value="chakra" checked={false}>
              <Menu.OptionItemIndicator>✅</Menu.OptionItemIndicator>
              <Menu.OptionItemText>Chakra UI</Menu.OptionItemText>
            </Menu.OptionItem>
          </Menu.ItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}
