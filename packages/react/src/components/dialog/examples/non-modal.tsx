import { Dialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'

export const NonModal = () => (
  <Dialog.Root modal={false}>
    <Dialog.Trigger className={button.Root}>Open Non-Modal Dialog</Dialog.Trigger>
    <Portal>
      <Dialog.Backdrop className={styles.Backdrop} />
      <Dialog.Positioner className={styles.Positioner}>
        <Dialog.Content className={styles.Content}>
          <Dialog.CloseTrigger className={styles.CloseTrigger}>
            <XIcon />
          </Dialog.CloseTrigger>
          <Dialog.Title className={styles.Title}>Non-Modal Dialog</Dialog.Title>
          <Dialog.Description className={styles.Description}>
            This dialog allows interaction with elements outside. You can click buttons, select text, and interact with
            the page behind it.
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
)
