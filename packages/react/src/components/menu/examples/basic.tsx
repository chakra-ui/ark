import { Menu } from '@ark-ui/react/menu'
import { ChevronDownIcon } from 'lucide-react'
import styles from 'styles/menu.module.css'

export const Basic = () => (
  <Menu.Root>
    <Menu.Trigger className={styles.Trigger}>
      File
      <Menu.Indicator className={styles.Indicator}>
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Menu.Positioner>
      <Menu.Content className={styles.Content}>
        <Menu.Arrow className={styles.Arrow}>
          <Menu.ArrowTip className={styles.ArrowTip} />
        </Menu.Arrow>
        <Menu.Item className={styles.Item} value="new-file">
          New File
        </Menu.Item>
        <Menu.Item className={styles.Item} value="open">
          Open...
        </Menu.Item>
        <Menu.Item className={styles.Item} value="save">
          Save
        </Menu.Item>
        <Menu.Item className={styles.Item} value="save-as">
          Save As...
        </Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)
