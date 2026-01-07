import { Dialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import field from 'styles/field.module.css'
import styles from 'styles/dialog.module.css'

export const CloseOnEscape = () => (
  <Dialog.Root closeOnEscape={false}>
    <Dialog.Trigger className={button.Root}>Open Dialog</Dialog.Trigger>
    <Portal>
      <Dialog.Backdrop className={styles.Backdrop} />
      <Dialog.Positioner className={styles.Positioner}>
        <Dialog.Content className={styles.Content}>
          <Dialog.CloseTrigger className={styles.CloseTrigger}>
            <XIcon />
          </Dialog.CloseTrigger>
          <Dialog.Title className={styles.Title}>Unsaved Changes</Dialog.Title>
          <Dialog.Description className={styles.Description}>
            This dialog prevents closing with the Escape key. Use the close button to dismiss.
          </Dialog.Description>
          <div className={styles.Body}>
            <textarea className={field.Textarea} placeholder="Type something..." rows={3} />
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
)
