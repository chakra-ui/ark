import { Menu } from '@ark-ui/solid/menu'
import { Menubar } from '@ark-ui/solid/menubar'
import { Portal } from 'solid-js/web'
import menu from 'styles/menu.module.css'
import styles from 'styles/menubar.module.css'

export const Basic = () => (
  <Menubar.Root class={styles.Root}>
    <Menu.Root>
      <Menu.Trigger class={styles.Trigger}>File</Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content class={menu.Content}>
            <Menu.Item class={menu.Item} value="new">
              New File
            </Menu.Item>
            <Menu.Item class={menu.Item} value="open">
              Open...
            </Menu.Item>
            <Menu.Separator class={menu.Separator} />
            <Menu.Item class={menu.Item} value="save">
              Save
            </Menu.Item>
            <Menu.Item class={menu.Item} value="save-as">
              Save As...
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>

    <Menu.Root>
      <Menu.Trigger class={styles.Trigger}>Edit</Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content class={menu.Content}>
            <Menu.Item class={menu.Item} value="undo">
              Undo
            </Menu.Item>
            <Menu.Item class={menu.Item} value="redo">
              Redo
            </Menu.Item>
            <Menu.Separator class={menu.Separator} />
            <Menu.Item class={menu.Item} value="cut">
              Cut
            </Menu.Item>
            <Menu.Item class={menu.Item} value="copy">
              Copy
            </Menu.Item>
            <Menu.Item class={menu.Item} value="paste">
              Paste
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>

    <Menu.Root>
      <Menu.Trigger class={styles.Trigger} disabled>
        Develop
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content class={menu.Content}>
            <Menu.Item class={menu.Item} value="inspect">
              Inspect Element
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>

    <Menu.Root>
      <Menu.Trigger class={styles.Trigger}>View</Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content class={menu.Content}>
            <Menu.Item class={menu.Item} value="zoom-in">
              Zoom In
            </Menu.Item>
            <Menu.Item class={menu.Item} value="zoom-out">
              Zoom Out
            </Menu.Item>
            <Menu.Item class={menu.Item} value="fullscreen">
              Toggle Fullscreen
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  </Menubar.Root>
)
