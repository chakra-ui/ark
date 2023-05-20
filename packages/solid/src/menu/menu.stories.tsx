import { createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import type { Meta } from 'storybook-solidjs'
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

const meta: Meta = {
  title: 'Menu',
}

export default meta

export const Basic = () => (
  <Menu>
    <MenuTrigger>Open Menu</MenuTrigger>
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

export const WithIsOpen = () => {
  const [isOpen, setIsOpen] = createSignal(false)

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen())}>Trigger from the outside</button>
      <Menu isOpen={isOpen}>
        <MenuTrigger>Toggle Menu</MenuTrigger>
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
    </>
  )
}

export const Group = () => (
  <Menu>
    <MenuTrigger>Open Menu</MenuTrigger>
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
  const [value, setValue] = createSignal<Record<string, string | string[]>>({
    framework: '',
    libraries: [],
  })
  return (
    <Menu
      value={value()}
      onValueChange={(data) => {
        setValue((prev) => ({
          ...prev,
          [data.name]: data.value,
        }))
      }}
    >
      <MenuTrigger>Open Menu</MenuTrigger>
      <Portal>
        <MenuPositioner>
          <MenuContent>
            <MenuItemGroup id="radio-group">
              <MenuItemGroupLabel htmlFor="radio-group">Radio Group</MenuItemGroupLabel>
              <MenuOptionItem name="framework" type="radio" value="react">
                {(itemState) => <>{itemState().isActive ? '✅' : ''} React</>}
              </MenuOptionItem>
              <MenuOptionItem name="framework" type="radio" value="solid">
                {(itemState) => <>{itemState().isActive ? '✅' : ''} Solid</>}
              </MenuOptionItem>
              <MenuOptionItem name="framework" type="radio" value="vue">
                {(itemState) => <>{itemState().isActive ? '✅' : ''} Vue</>}
              </MenuOptionItem>
            </MenuItemGroup>
            <MenuItemGroup id="checkbox-group">
              <MenuItemGroupLabel htmlFor="checkbox-group">Checkbox Group</MenuItemGroupLabel>
              <MenuOptionItem name="libraries" type="checkbox" value="zag-js">
                {(itemState) => <>{itemState().isActive ? '✅' : ''} zag-js</>}
              </MenuOptionItem>
              <MenuOptionItem name="libraries" type="checkbox" value="ark">
                {(itemState) => <>{itemState().isActive ? '✅' : ''} ark</>}
              </MenuOptionItem>
              <MenuOptionItem name="libraries" type="checkbox" value="panda">
                {(itemState) => <>{itemState().isActive ? '✅' : ''} panda</>}
              </MenuOptionItem>
              <MenuOptionItem name="libraries" type="checkbox" value="chakra">
                {(itemState) => <>{itemState().isActive ? '✅' : ''} chakra</>}
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
    <MenuTrigger>Open Menu</MenuTrigger>
    <Portal>
      <MenuPositioner>
        <MenuContent>
          <MenuItem id="new-tab">New Tab...</MenuItem>
          <MenuItem id="new-win">New Window...</MenuItem>
          <MenuSeparator />
          <Menu>
            <MenuTriggerItem>Share &gt;</MenuTriggerItem>
            <Portal>
              <MenuPositioner style={{ 'z-index': '1' }}>
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
