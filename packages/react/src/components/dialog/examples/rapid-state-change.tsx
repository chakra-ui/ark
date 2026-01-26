import { Dialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'

const promise1 = Promise.resolve()
const promise2 = Promise.resolve()

export const RapidStateChange = () => {
  const [open, setOpen] = useState(false)

  const handleClick = async () => {
    setOpen(true)
    await promise1
    setOpen(false)
    await promise2
    setOpen(true)
  }

  return (
    <>
      <button className={button.Root} onClick={handleClick}>
        Open Dialog {String(open)}
      </button>
      <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop className={styles.Backdrop} />
          <Dialog.Positioner className={styles.Positioner}>
            <Dialog.Content className={styles.Content}>
              <Dialog.CloseTrigger className={styles.CloseTrigger}>
                <XIcon />
              </Dialog.CloseTrigger>
              <Dialog.Title className={styles.Title}>Rapid State Test</Dialog.Title>
              <Dialog.Description className={styles.Description}>
                This dialog tests rapid state changes (true → false → true). If working correctly, the dialog should be
                open after clicking the button.
              </Dialog.Description>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}
