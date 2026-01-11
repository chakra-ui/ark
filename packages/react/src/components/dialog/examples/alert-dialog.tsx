import { Dialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'

export const AlertDialog = () => (
  <Dialog.Root role="alertdialog">
    <Dialog.Trigger className={button.Root}>Delete Account</Dialog.Trigger>
    <Portal>
      <Dialog.Backdrop className={styles.Backdrop} />
      <Dialog.Positioner className={styles.Positioner}>
        <Dialog.Content className={styles.Content}>
          <Dialog.Title className={styles.Title}>Are you absolutely sure?</Dialog.Title>
          <Dialog.Description className={styles.Description}>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </Dialog.Description>
          <div className={styles.Actions}>
            <Dialog.CloseTrigger className={button.Root}>Cancel</Dialog.CloseTrigger>
            <button className={button.Root} data-variant="solid">
              Delete Account
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
)
