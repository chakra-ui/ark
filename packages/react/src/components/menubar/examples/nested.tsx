import { Menu } from '@ark-ui/react/menu'
import { Menubar } from '@ark-ui/react/menubar'
import { Portal } from '@ark-ui/react/portal'
import menu from 'styles/menu.module.css'
import styles from 'styles/menubar.module.css'

export const Nested = () => (
  <Menubar.Root className={styles.Root}>
    <Menu.Root>
      <Menu.Trigger className={styles.Trigger}>File</Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content className={menu.Content}>
            <Menu.Item className={menu.Item} value="new">
              New File
            </Menu.Item>
            <Menu.Item className={menu.Item} value="open">
              Open...
            </Menu.Item>
            <Menu.Separator className={menu.Separator} />
            <Menu.Root>
              <Menu.TriggerItem className={menu.TriggerItem}>Export</Menu.TriggerItem>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content className={menu.Content}>
                    <Menu.Item className={menu.Item} value="pdf">
                      PDF
                    </Menu.Item>
                    <Menu.Item className={menu.Item} value="png">
                      PNG
                    </Menu.Item>
                    <Menu.Item className={menu.Item} value="svg">
                      SVG
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
            <Menu.Separator className={menu.Separator} />
            <Menu.Item className={menu.Item} value="print">
              Print...
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>

    <Menu.Root>
      <Menu.Trigger className={styles.Trigger}>Edit</Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content className={menu.Content}>
            <Menu.Item className={menu.Item} value="cut">
              Cut
            </Menu.Item>
            <Menu.Item className={menu.Item} value="copy">
              Copy
            </Menu.Item>
            <Menu.Item className={menu.Item} value="paste">
              Paste
            </Menu.Item>
            <Menu.Separator className={menu.Separator} />
            <Menu.Root>
              <Menu.TriggerItem className={menu.TriggerItem}>Find</Menu.TriggerItem>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content className={menu.Content}>
                    <Menu.Item className={menu.Item} value="find">
                      Find...
                    </Menu.Item>
                    <Menu.Item className={menu.Item} value="find-next">
                      Find Next
                    </Menu.Item>
                    <Menu.Item className={menu.Item} value="replace">
                      Replace...
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>

    <Menu.Root>
      <Menu.Trigger className={styles.Trigger}>View</Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content className={menu.Content}>
            <Menu.Item className={menu.Item} value="zoom-in">
              Zoom In
            </Menu.Item>
            <Menu.Item className={menu.Item} value="zoom-out">
              Zoom Out
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  </Menubar.Root>
)
