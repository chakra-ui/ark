import { Dialog } from '@ark-ui/react/dialog'
import { Popover } from '@ark-ui/react/popover'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import dialog from 'styles/dialog.module.css'
import styles from 'styles/popover.module.css'

export const WithDialog = () => (
  <Dialog.Root>
    <Dialog.Trigger className={button.Root}>Open Dialog</Dialog.Trigger>
    <Portal>
      <Dialog.Backdrop className={dialog.Backdrop} />
      <Dialog.Positioner className={dialog.Positioner}>
        <Dialog.Content className={dialog.Content}>
          <Dialog.CloseTrigger className={dialog.CloseTrigger}>
            <XIcon />
          </Dialog.CloseTrigger>
          <Dialog.Title className={dialog.Title}>Edit Profile</Dialog.Title>
          <Dialog.Description className={dialog.Description}>Update your profile information below.</Dialog.Description>
          <div className={dialog.Body}>
            <Popover.Root lazyMount unmountOnExit>
              <Popover.Trigger className={button.Root}>More Options</Popover.Trigger>
              <Portal>
                <Popover.Positioner className={styles.Positioner}>
                  <Popover.Content className={styles.Content}>
                    <Popover.Arrow className={styles.Arrow}>
                      <Popover.ArrowTip className={styles.ArrowTip} />
                    </Popover.Arrow>
                    <Popover.CloseTrigger className={styles.CloseTrigger}>
                      <XIcon />
                    </Popover.CloseTrigger>
                    <Popover.Title className={styles.Title}>Additional Settings</Popover.Title>
                    <Popover.Description className={styles.Description}>
                      This popover renders correctly above the dialog.
                    </Popover.Description>
                  </Popover.Content>
                </Popover.Positioner>
              </Portal>
            </Popover.Root>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
)
