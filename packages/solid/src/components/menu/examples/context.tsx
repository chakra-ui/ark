import { Menu } from '@ark-ui/solid/menu'
import styles from 'styles/menu.module.css'

export const Context = () => (
  <Menu.Root>
    <Menu.ContextTrigger class={styles.ContextTrigger}>Right click here</Menu.ContextTrigger>
    <Menu.Positioner class={styles.Positioner}>
      <Menu.Content class={styles.Content}>
        <Menu.List class={styles.List}>
          <Menu.Item class={styles.Item} value="cut">
            Cut
          </Menu.Item>
          <Menu.Item class={styles.Item} value="copy">
            Copy
          </Menu.Item>
          <Menu.Item class={styles.Item} value="paste">
            Paste
          </Menu.Item>
          <Menu.Separator class={styles.Separator} />
          <Menu.Item class={styles.Item} value="delete">
            Delete
          </Menu.Item>
        </Menu.List>
      </Menu.Content>
    </Menu.Positioner>
  </Menu.Root>
)
