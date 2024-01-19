import { createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { Menu } from '../'
import './menu.css'

type MenuType = typeof Menu

const meta: Meta<MenuType> = {
  title: 'Menu',
  component: Menu,
}

export default meta

export const Basic = () => (
  <Menu.Root>
    <Menu.Trigger>Open Menu</Menu.Trigger>
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
  const [isOpen, setIsOpen] = createSignal(false)

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen())}>Trigger from the outside</button>
      <Menu.Root open={isOpen()} onSelect={(id) => console.log(id)}>
        <Menu.Trigger>Toggle Menu</Menu.Trigger>{' '}
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
    <Menu.Trigger>Open Menu</Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content>
        <Menu.ItemGroup id="group-1">
          <Menu.ItemGroupLabel for="group-1">Group 1</Menu.ItemGroupLabel>
          <Menu.Item id="share">Share...</Menu.Item>
          <Menu.Item id="move">Move...</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup id="group-2">
          <Menu.ItemGroupLabel for="group-2">Group 2</Menu.ItemGroupLabel>
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
      <Menu.Trigger>Open Menu</Menu.Trigger>{' '}
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
          <Menu.ItemGroup id="checkbox-group">
            <Menu.ItemGroupLabel for="checkbox-group">Checkbox Group</Menu.ItemGroupLabel>
            <Menu.OptionItem name="libraries" type="checkbox" value="zag-js">
              {(itemState) => <>{itemState().isChecked ? '✅' : ''} zag-js</>}
            </Menu.OptionItem>
            <Menu.OptionItem name="libraries" type="checkbox" value="ark">
              {(itemState) => <>{itemState().isChecked ? '✅' : ''} ark</>}
            </Menu.OptionItem>
            <Menu.OptionItem name="libraries" type="checkbox" value="panda">
              {(itemState) => <>{itemState().isChecked ? '✅' : ''} panda</>}
            </Menu.OptionItem>
            <Menu.OptionItem name="libraries" type="checkbox" value="chakra">
              {(itemState) => <>{itemState().isChecked ? '✅' : ''} chakra</>}
            </Menu.OptionItem>
          </Menu.ItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}
