import { Menu } from '@ark-ui/react/menu'
import styles from 'styles/menu.module.css'

export const Context = () => (
  <Menu.Root>
    <Menu.ContextTrigger className={styles.ContextTrigger}>Right click here</Menu.ContextTrigger>
    <Menu.Positioner>
      <Menu.Content className={styles.Content}>
        <Menu.Item className={styles.Item} value="cut">
          Cut
        </Menu.Item>
        <Menu.Item className={styles.Item} value="copy">
          Copy
        </Menu.Item>
        <Menu.Item className={styles.Item} value="paste">
          Paste
        </Menu.Item>
        <Menu.Separator className={styles.Separator} />
        <Menu.Item className={styles.Item} value="delete">
          Delete
        </Menu.Item>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)
