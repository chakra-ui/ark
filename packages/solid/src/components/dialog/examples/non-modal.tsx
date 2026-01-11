import { Dialog } from '@ark-ui/solid/dialog'
import { XIcon } from 'lucide-solid'
import { Portal } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'

export const NonModal = () => (
  <Dialog.Root modal={false}>
    <Dialog.Trigger class={button.Root}>Open Non-Modal</Dialog.Trigger>
    <Portal>
      <Dialog.Backdrop class={styles.Backdrop} />
      <Dialog.Positioner class={styles.Positioner}>
        <Dialog.Content class={styles.Content}>
          <Dialog.CloseTrigger class={styles.CloseTrigger}>
            <XIcon />
          </Dialog.CloseTrigger>
          <Dialog.Title class={styles.Title}>Non-Modal Dialog</Dialog.Title>
          <Dialog.Description class={styles.Description}>
            This dialog allows interaction with elements outside while open.
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
)
