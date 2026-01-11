import { Dialog, useDialog } from '@ark-ui/solid/dialog'
import { XIcon } from 'lucide-solid'
import { Portal } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'

export const RootProvider = () => {
  const dialog = useDialog()

  return (
    <>
      <button class={button.Root} onClick={() => dialog().setOpen(true)}>
        Open
      </button>

      <Dialog.RootProvider value={dialog}>
        <Portal>
          <Dialog.Backdrop class={styles.Backdrop} />
          <Dialog.Positioner class={styles.Positioner}>
            <Dialog.Content class={styles.Content}>
              <Dialog.CloseTrigger class={styles.CloseTrigger}>
                <XIcon />
              </Dialog.CloseTrigger>
              <Dialog.Title class={styles.Title}>Account Settings</Dialog.Title>
              <Dialog.Description class={styles.Description}>
                Manage your account preferences and security options.
              </Dialog.Description>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.RootProvider>
    </>
  )
}
