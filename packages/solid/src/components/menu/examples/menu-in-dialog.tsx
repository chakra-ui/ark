import { Dialog } from '@ark-ui/solid/dialog'
import { Menu } from '@ark-ui/solid/menu'
import { ChevronDownIcon, XIcon } from 'lucide-solid'
import { Portal } from 'solid-js/web'
import button from 'styles/button.module.css'
import dialog from 'styles/dialog.module.css'
import styles from 'styles/menu.module.css'

export const MenuInDialog = () => (
  <Dialog.Root>
    <Dialog.Trigger class={button.Root}>Open Dialog</Dialog.Trigger>
    <Portal>
      <Dialog.Backdrop class={dialog.Backdrop} />
      <Dialog.Positioner class={dialog.Positioner}>
        <Dialog.Content class={dialog.Content}>
          <Dialog.Title class={dialog.Title}>Settings</Dialog.Title>
          <Dialog.Description class={dialog.Description}>Configure your preferences below.</Dialog.Description>
          <Dialog.CloseTrigger class={dialog.CloseTrigger}>
            <XIcon />
          </Dialog.CloseTrigger>
          <div class={dialog.Body}>
            <Menu.Root lazyMount unmountOnExit>
              <Menu.Trigger class={styles.Trigger}>
                Select theme
                <Menu.Indicator class={styles.Indicator}>
                  <ChevronDownIcon />
                </Menu.Indicator>
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content class={styles.Content}>
                    <Menu.Arrow class={styles.Arrow}>
                      <Menu.ArrowTip class={styles.ArrowTip} />
                    </Menu.Arrow>
                    <Menu.Item class={styles.Item} value="light">
                      Light
                    </Menu.Item>
                    <Menu.Item class={styles.Item} value="dark">
                      Dark
                    </Menu.Item>
                    <Menu.Item class={styles.Item} value="system">
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
