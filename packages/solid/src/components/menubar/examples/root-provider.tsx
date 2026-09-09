import { Menu } from '@ark-ui/solid/menu'
import { Menubar, useMenubar } from '@ark-ui/solid/menubar'
import { Portal } from 'solid-js/web'
import menu from 'styles/menu.module.css'
import styles from 'styles/menubar.module.css'

export const RootProvider = () => {
  const menubar = useMenubar()

  return (
    <div class="stack">
      <span>hasOpenMenu: {String(menubar().hasOpenMenu)}</span>
      <Menubar.RootProvider class={styles.Root} value={menubar}>
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
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Menubar.RootProvider>
    </div>
  )
}
