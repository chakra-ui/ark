import { Dialog, useDialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'

export const Nested = () => {
  const parentDialog = useDialog()
  const childDialog = useDialog()

  return (
    <>
      <button className={button.Root} onClick={() => parentDialog.setOpen(true)}>
        Open Parent Dialog
      </button>

      <Dialog.RootProvider value={parentDialog}>
        <Portal>
          <Dialog.Backdrop className={styles.Backdrop} />
          <Dialog.Positioner className={styles.Positioner}>
            <Dialog.Content className={styles.Content}>
              <Dialog.CloseTrigger className={styles.CloseTrigger}>
                <XIcon />
              </Dialog.CloseTrigger>
              <Dialog.Title className={styles.Title}>Parent Dialog</Dialog.Title>
              <Dialog.Description className={styles.Description}>
                This is the parent dialog. Open a nested dialog to see automatic z-index management.
              </Dialog.Description>
              <div className={styles.Body}>
                <button className={button.Root} onClick={() => childDialog.setOpen(true)}>
                  Open Nested Dialog
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.RootProvider>

      <Dialog.RootProvider value={childDialog}>
        <Portal>
          <Dialog.Backdrop className={styles.Backdrop} />
          <Dialog.Positioner className={styles.Positioner}>
            <Dialog.Content className={styles.Content}>
              <Dialog.CloseTrigger className={styles.CloseTrigger}>
                <XIcon />
              </Dialog.CloseTrigger>
              <Dialog.Title className={styles.Title}>Nested Dialog</Dialog.Title>
              <Dialog.Description className={styles.Description}>
                This dialog is nested within the parent with proper z-index layering.
              </Dialog.Description>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.RootProvider>
    </>
  )
}
