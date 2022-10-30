import { Meta, Story } from '@storybook/react'
import { Menu, MenuProps } from './menu'
import { MenuContent } from './menu-content'
import { MenuItem } from './menu-item'
import { NestedMenu } from './nested-menu'
import { MenuPositioner } from './menu-positioner'
import { MenuSeparator } from './menu-separator'
import { MenuTrigger } from './menu-trigger'

export default {
  title: 'React/Menu',
  argTypes: { onSelect: { action: 'selected' } },
} as Meta

export const basic: Story<MenuProps> = (props) => {
  return (
    <Menu {...props}>
      <MenuTrigger>
        <button>Open</button>
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent>
          <MenuItem id="new-tab">New tab</MenuItem>
          <MenuItem id="new-window">New window</MenuItem>
          <MenuItem id="print">Print</MenuItem>
          <MenuItem id="help">Help</MenuItem>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  )
}

export const nested: Story<MenuProps> = (props) => {
  return (
    <Menu {...props}>
      <MenuTrigger>
        <button>Open</button>
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent>
          <MenuItem id="new-tab">New tab</MenuItem>
          <MenuItem id="new-window">New window</MenuItem>
          <MenuItem id="print">Print</MenuItem>
          <MenuItem id="help">Help</MenuItem>
          <MenuSeparator />
          <NestedMenu {...props}>
            <MenuItem id="share">Share...</MenuItem>
            <MenuPositioner>
              <MenuContent>
                <MenuItem id="twitter">Twitter</MenuItem>
                <MenuItem id="message">Message</MenuItem>
              </MenuContent>
            </MenuPositioner>
          </NestedMenu>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  )
}
