import { Dialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import { useRef } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'

export const FinalFocus = () => {
  const finalRef = useRef<HTMLButtonElement>(null)

  return (
    <div className="stack">
      <button className={button.Root} ref={finalRef}>
        I will receive focus when dialog closes
      </button>
      <Dialog.Root finalFocusEl={() => finalRef.current}>
        <Dialog.Trigger className={button.Root}>Open Dialog</Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop className={styles.Backdrop} />
          <Dialog.Positioner className={styles.Positioner}>
            <Dialog.Content className={styles.Content}>
              <Dialog.CloseTrigger className={styles.CloseTrigger}>
                <XIcon />
              </Dialog.CloseTrigger>
              <Dialog.Title className={styles.Title}>Focus Redirect</Dialog.Title>
              <Dialog.Description className={styles.Description}>
                When this dialog closes, focus will return to the button above instead of the trigger.
              </Dialog.Description>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </div>
  )
}
