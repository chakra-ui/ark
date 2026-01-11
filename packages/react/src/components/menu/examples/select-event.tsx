import { Menu } from '@ark-ui/react/menu'
import { ChevronDownIcon } from 'lucide-react'
import styles from 'styles/menu.module.css'

export const SelectEvent = () => (
  <Menu.Root onSelect={(e) => console.log('Selected:', e.value)}>
    <Menu.Trigger className={styles.Trigger}>
      Account
      <Menu.Indicator className={styles.Indicator}>
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content className={styles.Content}>
        {items.map((item) => (
          <Menu.Item
            className={styles.Item}
            key={item.value}
            value={item.value}
            onSelect={() => console.log('Item selected:', item.label)}
          >
            {item.label}
          </Menu.Item>
        ))}
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
