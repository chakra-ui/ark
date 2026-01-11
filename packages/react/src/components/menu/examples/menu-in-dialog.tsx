import { Dialog } from '@ark-ui/react/dialog'
import { Menu } from '@ark-ui/react/menu'
import { Portal } from '@ark-ui/react/portal'
import { ChevronDownIcon, XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import dialog from 'styles/dialog.module.css'
import styles from 'styles/menu.module.css'

export const MenuInDialog = () => (
  <Dialog.Root>
    <Dialog.Trigger className={button.Root}>Open Dialog</Dialog.Trigger>
    <Portal>
      <Dialog.Backdrop className={dialog.Backdrop} />
      <Dialog.Positioner className={dialog.Positioner}>
        <Dialog.Content className={dialog.Content}>
          <Dialog.Title className={dialog.Title}>Settings</Dialog.Title>
          <Dialog.Description className={dialog.Description}>Configure your preferences below.</Dialog.Description>
          <Dialog.CloseTrigger className={dialog.CloseTrigger}>
            <XIcon />
          </Dialog.CloseTrigger>
          <div className={dialog.Body}>
            <Menu.Root lazyMount unmountOnExit>
              <Menu.Trigger className={styles.Trigger}>
                Select theme
                <Menu.Indicator className={styles.Indicator}>
                  <ChevronDownIcon />
                </Menu.Indicator>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content className={styles.Content}>
                    <Menu.Arrow className={styles.Arrow}>
                      <Menu.ArrowTip className={styles.ArrowTip} />
                    </Menu.Arrow>
                    <Menu.Item className={styles.Item} value="light">
                      Light
                    </Menu.Item>
                    <Menu.Item className={styles.Item} value="dark">
                      Dark
                    </Menu.Item>
                    <Menu.Item className={styles.Item} value="system">
                      System
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
)
