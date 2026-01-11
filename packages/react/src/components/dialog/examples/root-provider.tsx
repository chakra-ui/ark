import { Dialog, useDialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'

export const RootProvider = () => {
  const dialog = useDialog()

  return (
    <div className="stack">
      <button className={button.Root} onClick={() => dialog.setOpen(true)}>
        Dialog is {dialog.open ? 'open' : 'closed'}
      </button>
      <Dialog.RootProvider value={dialog}>
        <Portal>
          <Dialog.Backdrop className={styles.Backdrop} />
          <Dialog.Positioner className={styles.Positioner}>
            <Dialog.Content className={styles.Content}>
              <Dialog.CloseTrigger className={styles.CloseTrigger}>
                <XIcon />
              </Dialog.CloseTrigger>
              <Dialog.Title className={styles.Title}>Controlled Externally</Dialog.Title>
              <Dialog.Description className={styles.Description}>
                This dialog is controlled via the useDialog hook.
              </Dialog.Description>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.RootProvider>
    </div>
  )
}
