import { Menu } from './menu'
import { MenuContent } from './menu-content'
import { MenuGroup } from './menu-group'
import { MenuGroupLabel } from './menu-group-label'
import { MenuItem } from './menu-item'
import { MenuPositioner } from './menu-positioner'
import { MenuSeparator } from './menu-separator'
import { MenuTrigger } from './menu-trigger'
import { NestedMenu } from './nested-menu'

export const Basic = () => (
  <Menu>
    <MenuTrigger>
      <button>Open menu</button>
    </MenuTrigger>
    <MenuContent>
      <MenuItem id="search">Search</MenuItem>
      <MenuItem id="undo">Undo</MenuItem>
      <MenuItem id="delivery" disabled>
        Delivery
      </MenuItem>
      <MenuItem id="unlink">Unlink</MenuItem>
    </MenuContent>
  </Menu>
)

export const Group = () => (
  <Menu>
    <MenuTrigger>
      <button>Open menu</button>
    </MenuTrigger>
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
  </Menu>
)

export const SubMenu = () => (
  <Menu>
    <MenuTrigger>
      <button>Open menu</button>
    </MenuTrigger>
    <MenuContent>
      <span>main menu content</span>
      <MenuSeparator />
      <NestedMenu>
        <MenuItem id="share">Share...</MenuItem>
        <MenuPositioner>
          <MenuContent>
            <span>nested menu content</span>
            <MenuItem id="twitter">Twitter</MenuItem>
            <MenuItem id="message">Message</MenuItem>
          </MenuContent>
        </MenuPositioner>
      </NestedMenu>
    </MenuContent>
  </Menu>
)
