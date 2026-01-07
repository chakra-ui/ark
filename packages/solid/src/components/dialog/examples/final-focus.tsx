import { Dialog } from '@ark-ui/solid/dialog'
import { XIcon } from 'lucide-solid'
import { Portal } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'

export const FinalFocus = () => {
  let buttonRef: HTMLButtonElement | undefined

  return (
    <>
      <button ref={buttonRef} class={button.Root}>
        Focus Target
      </button>
      <Dialog.Root finalFocusEl={() => buttonRef}>
        <Dialog.Trigger class={button.Root}>Open Dialog</Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop class={styles.Backdrop} />
          <Dialog.Positioner class={styles.Positioner}>
            <Dialog.Content class={styles.Content}>
              <Dialog.CloseTrigger class={styles.CloseTrigger}>
                <XIcon />
              </Dialog.CloseTrigger>
              <Dialog.Title class={styles.Title}>Custom Focus Return</Dialog.Title>
              <Dialog.Description class={styles.Description}>
                When this dialog closes, focus will return to the "Focus Target" button instead of the trigger.
              </Dialog.Description>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}
