import { Dialog } from '@ark-ui/solid/dialog'
import { XIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'

export const Controlled = () => {
  const [open, setOpen] = createSignal(false)

  return (
    <Dialog.Root open={open()} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger class={button.Root}>Open Dialog</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop class={styles.Backdrop} />
        <Dialog.Positioner class={styles.Positioner}>
          <Dialog.Content class={styles.Content}>
            <Dialog.CloseTrigger class={styles.CloseTrigger}>
              <XIcon />
            </Dialog.CloseTrigger>
            <Dialog.Title class={styles.Title}>Session Settings</Dialog.Title>
            <Dialog.Description class={styles.Description}>
              Manage your session preferences and security options.
            </Dialog.Description>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
