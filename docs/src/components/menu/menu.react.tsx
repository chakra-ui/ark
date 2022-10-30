import {
  Menu,
  MenuContent,
  MenuContextTrigger,
  MenuItem,
  MenuPositioner,
  MenuProps,
  MenuSeparator,
  MenuTrigger,
  NestedMenu,
} from '@atlas/react'

export const ReactMenu = (props: MenuProps) => {
  return (
    <Menu id="menu" closeOnSelect {...props}>
      <MenuTrigger>
        <button>Open menu</button>
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent style={{ display: 'flex', flexDirection: 'column' }}>
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
    <Menu id="nested" {...props}>
      <MenuTrigger>
        <button>Open nested menu</button>
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent style={{ display: 'flex', flexDirection: 'column' }}>
          <MenuItem id="new-tab">New tab</MenuItem>
          <MenuItem id="new-window">New window</MenuItem>
          <MenuItem id="print">Print</MenuItem>
          <MenuItem id="help">Help</MenuItem>
          <MenuSeparator />
          <NestedMenu {...props}>
            <MenuItem id="share">Share...</MenuItem>
            <MenuPositioner>
              <MenuContent style={{ display: 'flex', flexDirection: 'column' }}>
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
      <MenuContextTrigger>
        <button>Open</button>
      </MenuContextTrigger>
      <MenuPositioner>
        <MenuContent style={{ display: 'flex', flexDirection: 'column' }}>
          <MenuItem id="new-tab">New tab</MenuItem>
          <MenuItem id="new-window">New window</MenuItem>
          <MenuItem id="print">Print</MenuItem>
          <MenuItem id="help">Help</MenuItem>
          <MenuSeparator />
          <NestedMenu {...props}>
            <MenuItem id="share">Share...</MenuItem>
            <MenuPositioner>
              <MenuContent style={{ display: 'flex', flexDirection: 'column' }}>
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
