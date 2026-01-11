import { Menu } from '@ark-ui/react/menu'
import { ChevronDownIcon } from 'lucide-react'
import styles from 'styles/menu.module.css'

export const ItemContext = () => (
  <Menu.Root>
    <Menu.Trigger className={styles.Trigger}>
      Settings
      <Menu.Indicator className={styles.Indicator}>
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content className={styles.Content}>
        <Menu.Item className={styles.Item} value="profile">
          <Menu.ItemContext>
            {(item) => <span style={{ fontWeight: item.highlighted ? 600 : 400 }}>Profile Settings</span>}
          </Menu.ItemContext>
        </Menu.Item>
        <Menu.Item className={styles.Item} value="preferences">
          Preferences
        </Menu.Item>
        <Menu.Item className={styles.Item} value="notifications">
          Notifications
        </Menu.Item>
        <Menu.Separator className={styles.Separator} />
        <Menu.Item className={styles.Item} value="logout">
          Log Out
        </Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)
