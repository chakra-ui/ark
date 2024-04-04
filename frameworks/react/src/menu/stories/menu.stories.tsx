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
        <Menu.ItemGroup>
          <Menu.ItemGroupLabel>Group 1</Menu.ItemGroupLabel>
          <Menu.Item value="share">Share...</Menu.Item>
          <Menu.Item value="move">Move...</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup>
          <Menu.ItemGroupLabel>Group 2</Menu.ItemGroupLabel>
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
          <Menu.ItemGroup>
            <Menu.CheckboxItem checked>
              <Menu.ItemIndicator>✅</Menu.ItemIndicator>
              <Menu.ItemText>Zag.js</Menu.ItemText>
            </Menu.CheckboxItem>
          </Menu.ItemGroup>
          {/* <Menu.RadioItemGroup>
            <Menu.ItemGroupLabel>Radio Group</Menu.ItemGroupLabel>
            <Menu.RadioItem value="react">
              <Menu.ItemIndicator>✅</Menu.ItemIndicator>
              <Menu.ItemText>React</Menu.ItemText>
            </Menu.RadioItem>
            <Menu.RadioItem type="radio" value="solid" checked={false}>
              <Menu.ItemIndicator>✅</Menu.ItemIndicator>
              <Menu.ItemText>Solid</Menu.ItemText>
            </Menu.RadioItem>
            <Menu.RadioItem type="radio" value="vue" checked={false}>
              <Menu.ItemIndicator>✅</Menu.ItemIndicator>
              <Menu.ItemText>Vue</Menu.ItemText>
            </Menu.RadioItem>
          </Menu.RadioItemGroup>
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel>Checkbox Group</Menu.ItemGroupLabel>
            <Menu.CheckboxItem>
              <Menu.ItemIndicator>✅</Menu.ItemIndicator>
              <Menu.ItemText>Zag.js</Menu.ItemText>
            </Menu.CheckboxItem>
            <Menu.CheckboxItem>
              <Menu.ItemIndicator>✅</Menu.ItemIndicator>
              <Menu.ItemText>Ark UI</Menu.ItemText>
            </Menu.CheckboxItem>
            <Menu.CheckboxItem value="panda" checked={false}>
              <Menu.ItemIndicator>✅</Menu.ItemIndicator>
              <Menu.ItemText>Panda CSS</Menu.ItemText>
            </Menu.CheckboxItem>
            <Menu.CheckboxItem value="chakra" checked={false}>
              <Menu.ItemIndicator>✅</Menu.ItemIndicator>
              <Menu.ItemText>Chakra UI</Menu.ItemText>
            </Menu.CheckboxItem>
          </Menu.ItemGroup> */}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}
