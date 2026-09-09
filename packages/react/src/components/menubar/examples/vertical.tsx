import { Menu } from '@ark-ui/react/menu'
import { Menubar } from '@ark-ui/react/menubar'
import { Portal } from '@ark-ui/react/portal'
import menu from 'styles/menu.module.css'
import styles from 'styles/menubar.module.css'

export const Vertical = () => (
  <Menubar.Root className={styles.Root} orientation="vertical">
    <Menu.Root positioning={{ placement: 'right-start' }}>
      <Menu.Trigger className={styles.Trigger}>Account</Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content className={menu.Content}>
            <Menu.Item className={menu.Item} value="profile">
              Profile
            </Menu.Item>
            <Menu.Item className={menu.Item} value="billing">
              Billing
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>

    <Menu.Root positioning={{ placement: 'right-start' }}>
      <Menu.Trigger className={styles.Trigger}>Workspace</Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content className={menu.Content}>
            <Menu.Item className={menu.Item} value="members">
              Members
            </Menu.Item>
            <Menu.Item className={menu.Item} value="integrations">
              Integrations
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>

    <Menu.Root positioning={{ placement: 'right-start' }}>
      <Menu.Trigger className={styles.Trigger}>Help</Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content className={menu.Content}>
            <Menu.Item className={menu.Item} value="docs">
              Documentation
            </Menu.Item>
            <Menu.Item className={menu.Item} value="support">
              Contact Support
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  </Menubar.Root>
)
