import { Portal } from '@reach/portal'
import {
  Menu,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
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

export const SubMenu = () => (
  <Menu>
    <MenuTrigger>
      <button>Open SubMenu</button>
    </MenuTrigger>
    <Portal>
      <MenuPositioner>
        <MenuContent>
          <MenuItem id="new-tab">New Tab...</MenuItem>
          <MenuItem id="new-win">New Window...</MenuItem>
          <MenuSeparator />
          <Menu>
            <MenuTriggerItem>Share...</MenuTriggerItem>
            <Portal>
              <MenuPositioner>
                <MenuContent>
                  <span>nested menu content</span>
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
