import { Menu } from '@ark-ui/react/menu'
import { Menubar, useMenubar } from '@ark-ui/react/menubar'
import { Portal } from '@ark-ui/react/portal'
import menu from 'styles/menu.module.css'
import styles from 'styles/menubar.module.css'

export const RootProvider = () => {
  const menubar = useMenubar()

  return (
    <div className="stack">
      <span>hasOpenMenu: {String(menubar.hasOpenMenu)}</span>
      <Menubar.RootProvider className={styles.Root} value={menubar}>
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
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </Menubar.RootProvider>
    </div>
  )
}
