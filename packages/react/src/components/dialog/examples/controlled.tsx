import { Dialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'

export const Controlled = () => {
  const [open, setOpen] = useState(false)
  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger className={button.Root}>Open Dialog</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop className={styles.Backdrop} />
        <Dialog.Positioner className={styles.Positioner}>
          <Dialog.Content className={styles.Content}>
            <Dialog.CloseTrigger className={styles.CloseTrigger}>
              <XIcon />
            </Dialog.CloseTrigger>
            <Dialog.Title className={styles.Title}>Session Settings</Dialog.Title>
            <Dialog.Description className={styles.Description}>
              Manage your session preferences and security options.
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
