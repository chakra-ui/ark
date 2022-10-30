import {
  Menu,
  MenuContent,
  MenuItem,
  MenuPositioner,
  MenuProps,
  MenuSeparator,
  MenuTrigger,
  NestedMenu,
} from '@atlas/react'

export const ReactMenu = (props: MenuProps) => {
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

export const ReactNestedMenu = (props: MenuProps) => {
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

export const ReactNestedContextMenu = (props: MenuProps) => {
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
