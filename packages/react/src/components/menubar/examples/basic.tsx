import { Menu } from '@ark-ui/react/menu'
import { Menubar } from '@ark-ui/react/menubar'
import { Portal } from '@ark-ui/react/portal'
import menu from 'styles/menu.module.css'
import styles from 'styles/menubar.module.css'

export const Basic = () => (
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
            <Menu.Item className={menu.Item} value="save">
              Save
            </Menu.Item>
            <Menu.Item className={menu.Item} value="save-as">
              Save As...
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
            <Menu.Item className={menu.Item} value="undo">
              Undo
            </Menu.Item>
            <Menu.Item className={menu.Item} value="redo">
              Redo
            </Menu.Item>
            <Menu.Separator className={menu.Separator} />
            <Menu.Item className={menu.Item} value="cut">
              Cut
            </Menu.Item>
            <Menu.Item className={menu.Item} value="copy">
              Copy
            </Menu.Item>
            <Menu.Item className={menu.Item} value="paste">
              Paste
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>

    <Menu.Root>
      <Menu.Trigger className={styles.Trigger} disabled>
        Develop
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content className={menu.Content}>
            <Menu.Item className={menu.Item} value="inspect">
              Inspect Element
            </Menu.Item>
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
            <Menu.Item className={menu.Item} value="fullscreen">
              Toggle Fullscreen
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  </Menubar.Root>
)
