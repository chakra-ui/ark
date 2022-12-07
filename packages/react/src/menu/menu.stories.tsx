import { Portal } from '@zag-js/react'
import { useState } from 'react'
import {
  Menu,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuItemOption,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger,
  MenuTriggerItem,
} from '.'
import './menu.css'

export const Basic = () => (
  <Menu>
    <MenuTrigger>
      <button>Open menu</button>
    </MenuTrigger>
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
    <MenuTrigger>
      <button>Open menu</button>
    </MenuTrigger>
    <Portal>
      <MenuPositioner>
        <MenuContent>
          <MenuGroup id="group-1">
            <MenuGroupLabel htmlFor="group-1">Group 1</MenuGroupLabel>
            <MenuItem id="share">Share...</MenuItem>
            <MenuItem id="move">Move...</MenuItem>
          </MenuGroup>
          <MenuGroup id="group-2">
            <MenuGroupLabel htmlFor="group-2">Group 2</MenuGroupLabel>
            <MenuItem id="rename">Rename...</MenuItem>
            <MenuItem id="delete">Delete...</MenuItem>
          </MenuGroup>
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
      <MenuTrigger>
        <button>Open menu</button>
      </MenuTrigger>
      <Portal>
        <MenuPositioner>
          <MenuContent>
            <MenuGroup id="radio-group">
              <MenuGroupLabel htmlFor="radio-group">Radio Group</MenuGroupLabel>
              <MenuItemOption name="framework" type="radio" value="react">
                {({ isActive }) => <>{isActive ? '✅' : ''} React</>}
              </MenuItemOption>
              <MenuItemOption name="framework" type="radio" value="solid">
                {({ isActive }) => <>{isActive ? '✅' : ''} Solid</>}
              </MenuItemOption>
              <MenuItemOption name="framework" type="radio" value="vue">
                {({ isActive }) => <>{isActive ? '✅' : ''} Vue</>}
              </MenuItemOption>
            </MenuGroup>
            <MenuGroup id="checkbox-group">
              <MenuGroupLabel htmlFor="checkbox-group">Checkbox Group</MenuGroupLabel>
              <MenuItemOption name="libraries" type="checkbox" value="zag-js">
                {({ isActive }) => <>{isActive ? '✅' : ''} zag-js</>}
              </MenuItemOption>
              <MenuItemOption name="libraries" type="checkbox" value="ark">
                {({ isActive }) => <>{isActive ? '✅' : ''} ark</>}
              </MenuItemOption>
              <MenuItemOption name="libraries" type="checkbox" value="panda">
                {({ isActive }) => <>{isActive ? '✅' : ''} panda</>}
              </MenuItemOption>
              <MenuItemOption name="libraries" type="checkbox" value="chakra">
                {({ isActive }) => <>{isActive ? '✅' : ''} chakra</>}
              </MenuItemOption>
            </MenuGroup>
          </MenuContent>
        </MenuPositioner>
      </Portal>
    </Menu>
  )
}

// export const Prosa = () => (
//   <MenuPositioner>
//     <MenuContent>
//       <MenutItemGroup>
//         <MenuItemGroupLabel></MenuItemGroupLabel>
//         <MenuItem id="search">Search</MenuItem>
//         <MenuOptionItem></MenuOptionItem>
//       </MenutItemGroup>
//     </MenuContent>
//   </MenuPositioner>
// )

export const SubMenu = () => (
  <Menu>
    <MenuTrigger>
      <button>Open menu</button>
    </MenuTrigger>
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
