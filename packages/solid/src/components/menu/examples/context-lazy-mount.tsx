import { Menu } from '@ark-ui/solid/menu'
import { Portal } from '@solidjs/web'
import styles from 'styles/menu.module.css'

export const ContextLazyMount = () => (
  <Menu.Root lazyMount unmountOnExit>
    <Menu.ContextTrigger class={styles.ContextTrigger}>Right click here</Menu.ContextTrigger>
    <Portal>
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
            <Menu.Root lazyMount unmountOnExit>
              <Menu.TriggerItem class={styles.TriggerItem}>Share</Menu.TriggerItem>
              <Portal>
                <Menu.Positioner class={styles.Positioner}>
                  <Menu.Content class={styles.Content}>
                    <Menu.List class={styles.List}>
                      <Menu.Item class={styles.Item} value="email">
                        Email
                      </Menu.Item>
                      <Menu.Item class={styles.Item} value="message">
                        Message
                      </Menu.Item>
                      <Menu.Item class={styles.Item} value="airdrop">
                        AirDrop
                      </Menu.Item>
                    </Menu.List>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          </Menu.List>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
)
