import { Menu } from '@ark-ui/solid/menu'
import { ChevronDownIcon } from 'lucide-solid'
import { For } from 'solid-js'
import styles from 'styles/menu.module.css'

export const SelectEvent = () => (
  <Menu.Root onSelect={(e) => console.log('Selected:', e.value)}>
    <Menu.Trigger class={styles.Trigger}>
      Account
      <Menu.Indicator class={styles.Indicator}>
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content class={styles.Content}>
        <For each={items}>
          {(item) => (
            <Menu.Item
              class={styles.Item}
              value={item.value}
              onSelect={() => console.log('Item selected:', item.label)}
            >
              {item.label}
            </Menu.Item>
          )}
        </For>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)

const items = [
  { value: 'profile', label: 'My Profile' },
  { value: 'settings', label: 'Settings' },
  { value: 'billing', label: 'Billing' },
  { value: 'logout', label: 'Log Out' },
]
