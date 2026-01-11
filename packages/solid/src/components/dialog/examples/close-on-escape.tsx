import { Dialog } from '@ark-ui/solid/dialog'
import { XIcon } from 'lucide-solid'
import { Portal } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'

export const CloseOnEscape = () => (
  <Dialog.Root
    closeOnEscape={false}
    onEscapeKeyDown={(e) => {
      e.preventDefault()
      alert('Escape key pressed but dialog stays open')
    }}
  >
    <Dialog.Trigger class={button.Root}>Open Dialog</Dialog.Trigger>
    <Portal>
      <Dialog.Backdrop class={styles.Backdrop} />
      <Dialog.Positioner class={styles.Positioner}>
        <Dialog.Content class={styles.Content}>
          <Dialog.CloseTrigger class={styles.CloseTrigger}>
            <XIcon />
          </Dialog.CloseTrigger>
          <Dialog.Title class={styles.Title}>Escape Disabled</Dialog.Title>
          <Dialog.Description class={styles.Description}>
            This dialog will not close when pressing the Escape key. Use the close button instead.
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
)
