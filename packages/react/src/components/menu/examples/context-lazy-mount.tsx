import { Menu } from '@ark-ui/react/menu'
import { Portal } from '@ark-ui/react/portal'
import styles from 'styles/menu.module.css'

export const ContextLazyMount = () => (
  <Menu.Root lazyMount unmountOnExit>
    <Menu.ContextTrigger className={styles.ContextTrigger}>Right click here</Menu.ContextTrigger>
    <Portal>
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
          <Menu.Root lazyMount unmountOnExit>
            <Menu.TriggerItem className={styles.TriggerItem}>Share</Menu.TriggerItem>
            <Portal>
              <Menu.Positioner>
                <Menu.Content className={styles.Content}>
                  <Menu.Item className={styles.Item} value="email">
                    Email
                  </Menu.Item>
                  <Menu.Item className={styles.Item} value="message">
                    Message
                  </Menu.Item>
                  <Menu.Item className={styles.Item} value="airdrop">
                    AirDrop
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
)
