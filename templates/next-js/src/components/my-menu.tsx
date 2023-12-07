'use client'
import { Menu, Portal } from '@ark-ui/react'

export function MyMenu() {
  return (
    <Menu.Root>
      <Menu.Trigger>Open</Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Root>
              <Menu.TriggerItem>Submenu</Menu.TriggerItem>
            </Menu.Root>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}
