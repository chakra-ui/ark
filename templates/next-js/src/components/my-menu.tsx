'use client'
import { Menu } from '@ark-ui/react'

export function MyMenu() {
  return (
    <Menu.Root>
      <Menu.Trigger>Open</Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Root>
            <Menu.TriggerItem>Submenu</Menu.TriggerItem>
          </Menu.Root>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  )
}
