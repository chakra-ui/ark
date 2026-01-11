import { Menu } from '@ark-ui/react/menu'
import { Portal } from '@ark-ui/react/portal'
import { ChevronDownIcon } from 'lucide-react'
import styles from 'styles/menu.module.css'

export const Nested = () => (
  <Menu.Root>
    <Menu.Trigger className={styles.Trigger}>
      File
      <Menu.Indicator className={styles.Indicator}>
        <ChevronDownIcon />
      </Menu.Indicator>
    </Menu.Trigger>
    <Portal>
      <Menu.Positioner>
        <Menu.Content className={styles.Content}>
          <Menu.Item className={styles.Item} value="new">
            New File
          </Menu.Item>
          <Menu.Item className={styles.Item} value="open">
            Open...
          </Menu.Item>
          <Menu.Separator className={styles.Separator} />
          <Menu.Root>
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
          <Menu.Root>
            <Menu.TriggerItem className={styles.TriggerItem}>Export</Menu.TriggerItem>
            <Portal>
              <Menu.Positioner>
                <Menu.Content className={styles.Content}>
                  <Menu.Item className={styles.Item} value="pdf">
                    PDF
                  </Menu.Item>
                  <Menu.Item className={styles.Item} value="png">
                    PNG
                  </Menu.Item>
                  <Menu.Item className={styles.Item} value="svg">
                    SVG
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Portal>
          </Menu.Root>
          <Menu.Separator className={styles.Separator} />
          <Menu.Item className={styles.Item} value="print">
            Print...
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
)
