import { Menu } from '@ark-ui/react/menu'
import { ChevronDownIcon } from 'lucide-react'
import styles from 'styles/menu.module.css'

export const Group = () => (
  <Menu.Root>
    <Menu.Trigger className={styles.Trigger}>
      Edit
      <Menu.Indicator className={styles.Indicator}>
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content className={styles.Content}>
        <Menu.ItemGroup className={styles.ItemGroup}>
          <Menu.ItemGroupLabel className={styles.ItemGroupLabel}>Clipboard</Menu.ItemGroupLabel>
          <Menu.Item className={styles.Item} value="cut">
            Cut
          </Menu.Item>
          <Menu.Item className={styles.Item} value="copy">
            Copy
          </Menu.Item>
          <Menu.Item className={styles.Item} value="paste">
            Paste
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup className={styles.ItemGroup}>
          <Menu.ItemGroupLabel className={styles.ItemGroupLabel}>Selection</Menu.ItemGroupLabel>
          <Menu.Item className={styles.Item} value="select-all">
            Select All
          </Menu.Item>
          <Menu.Item className={styles.Item} value="deselect">
            Deselect
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)
