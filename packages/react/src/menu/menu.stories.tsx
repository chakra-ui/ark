import type { Meta } from '@storybook/react'
import { Portal } from '@zag-js/react'
import { useState } from 'react'
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuOptionItem,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger,
  MenuTriggerItem,
} from '.'
import './menu.css'

type MenuType = typeof Menu

const meta: Meta<MenuType> = {
  title: 'Menu',
  component: Menu,
}

export default meta

export const Basic = () => (
  <Menu>
    <MenuTrigger>Open menu</MenuTrigger>
    <Portal>
      <MenuPositioner>
        <MenuContent>
          <MenuItem id="search">Search</MenuItem>
          <MenuItem id="undo">Undo</MenuItem>
          <MenuItem id="delivery" disabled>
            Delivery
          </MenuItem>
          <MenuItem id="unlink">Unlink</MenuItem>
        </MenuContent>
      </MenuPositioner>
    </Portal>
  </Menu>
)

export const Group = () => (
  <Menu>
    <MenuTrigger>Open menu</MenuTrigger>
    <Portal>
      <MenuPositioner>
        <MenuContent>
          <MenuItemGroup id="group-1">
            <MenuItemGroupLabel htmlFor="group-1">Group 1</MenuItemGroupLabel>
            <MenuItem id="share">Share...</MenuItem>
            <MenuItem id="move">Move...</MenuItem>
          </MenuItemGroup>
          <MenuItemGroup id="group-2">
            <MenuItemGroupLabel htmlFor="group-2">Group 2</MenuItemGroupLabel>
            <MenuItem id="rename">Rename...</MenuItem>
            <MenuItem id="delete">Delete...</MenuItem>
          </MenuItemGroup>
        </MenuContent>
      </MenuPositioner>
    </Portal>
  </Menu>
)

export const Options = () => {
  const [value, setValue] = useState<Record<string, string | string[]>>({
    framework: '',
    libraries: [],
  })
  return (
    <Menu
      value={value}
      onValueChange={(data) => {
        setValue((prev) => ({
          ...prev,
          [data.name]: data.value,
        }))
      }}
    >
      <MenuTrigger>Open menu</MenuTrigger>
      <Portal>
        <MenuPositioner>
          <MenuContent>
            <MenuItemGroup id="radio-group">
              <MenuItemGroupLabel htmlFor="radio-group">Radio Group</MenuItemGroupLabel>
              <MenuOptionItem name="framework" type="radio" value="react">
                {({ isActive }) => <>{isActive ? '✅' : ''} React</>}
              </MenuOptionItem>
              <MenuOptionItem name="framework" type="radio" value="solid">
                {({ isActive }) => <>{isActive ? '✅' : ''} Solid</>}
              </MenuOptionItem>
              <MenuOptionItem name="framework" type="radio" value="vue">
                {({ isActive }) => <>{isActive ? '✅' : ''} Vue</>}
              </MenuOptionItem>
            </MenuItemGroup>
            <MenuItemGroup id="checkbox-group">
              <MenuItemGroupLabel htmlFor="checkbox-group">Checkbox Group</MenuItemGroupLabel>
              <MenuOptionItem name="libraries" type="checkbox" value="zag-js">
                {({ isActive }) => <>{isActive ? '✅' : ''} zag-js</>}
              </MenuOptionItem>
              <MenuOptionItem name="libraries" type="checkbox" value="ark">
                {({ isActive }) => <>{isActive ? '✅' : ''} ark</>}
              </MenuOptionItem>
              <MenuOptionItem name="libraries" type="checkbox" value="panda">
                {({ isActive }) => <>{isActive ? '✅' : ''} panda</>}
              </MenuOptionItem>
              <MenuOptionItem name="libraries" type="checkbox" value="chakra">
                {({ isActive }) => <>{isActive ? '✅' : ''} chakra</>}
              </MenuOptionItem>
            </MenuItemGroup>
          </MenuContent>
        </MenuPositioner>
      </Portal>
    </Menu>
  )
}

export const SubMenu = () => (
  <Menu>
    <MenuTrigger>Open menu</MenuTrigger>
    <Portal>
      <MenuPositioner>
        <MenuContent>
          <MenuItem id="new-tab">New Tab...</MenuItem>
          <MenuItem id="new-win">New Window...</MenuItem>
          <MenuSeparator />
          <Menu>
            <MenuTriggerItem>Share &gt;</MenuTriggerItem>
            <Portal>
              <MenuPositioner>
                <MenuContent>
                  <MenuItem id="twitter">Twitter</MenuItem>
                  <MenuItem id="message">Message</MenuItem>
                </MenuContent>
              </MenuPositioner>
            </Portal>
          </Menu>
        </MenuContent>
      </MenuPositioner>
    </Portal>
  </Menu>
)

export const ComplexSubMenu = () => {
  const [value, setValue] = useState<Record<string, string | string[]>>({
    framework: '',
    libraries: [],
  })
  return (
    <Menu
      value={value}
      onValueChange={(data) => {
        setValue((prev) => ({
          ...prev,
          [data.name]: data.value,
        }))
      }}
    >
      <MenuTrigger>Open menu</MenuTrigger>
      <Portal>
        <MenuPositioner>
          <MenuContent>
            <MenuItemGroup id="radio-group">
              <MenuItemGroupLabel htmlFor="radio-group">Radio Group</MenuItemGroupLabel>
              <MenuOptionItem name="framework" type="radio" value="react">
                {({ isActive }) => <>{isActive ? '✅' : ''} React</>}
              </MenuOptionItem>
              <MenuOptionItem name="framework" type="radio" value="solid">
                {({ isActive }) => <>{isActive ? '✅' : ''} Solid</>}
              </MenuOptionItem>
              <MenuOptionItem name="framework" type="radio" value="vue">
                {({ isActive }) => <>{isActive ? '✅' : ''} Vue</>}
              </MenuOptionItem>
            </MenuItemGroup>
            <Menu>
              <MenuTriggerItem>Share &gt;</MenuTriggerItem>
              <Portal>
                <MenuPositioner>
                  <MenuContent>
                    <MenuItem id="twitter">Twitter</MenuItem>
                    <MenuItem id="message">Message</MenuItem>
                  </MenuContent>
                </MenuPositioner>
              </Portal>
            </Menu>
          </MenuContent>
        </MenuPositioner>
      </Portal>
    </Menu>
  )
}
