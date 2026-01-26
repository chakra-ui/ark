import { Dialog, useDialog } from '@ark-ui/solid/dialog'
import { XIcon } from 'lucide-solid'
import { Portal } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'

export const Nested = () => {
  const parentDialog = useDialog()
  const childDialog = useDialog()

  return (
    <>
      <button class={button.Root} onClick={() => parentDialog().setOpen(true)}>
        Open Parent Dialog
      </button>

      <Dialog.RootProvider value={parentDialog}>
        <Portal>
          <Dialog.Backdrop class={styles.Backdrop} />
          <Dialog.Positioner class={styles.Positioner}>
            <Dialog.Content class={styles.Content}>
              <Dialog.CloseTrigger class={styles.CloseTrigger}>
                <XIcon />
              </Dialog.CloseTrigger>
              <Dialog.Title class={styles.Title}>Parent Dialog</Dialog.Title>
              <Dialog.Description class={styles.Description}>
                This is the parent dialog. Open a nested dialog from here.
              </Dialog.Description>
              <div class={styles.Actions}>
                <button class={button.Root} onClick={() => childDialog().setOpen(true)}>
                  Open Nested
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.RootProvider>

      <Dialog.RootProvider value={childDialog}>
        <Portal>
          <Dialog.Backdrop class={styles.Backdrop} />
          <Dialog.Positioner class={styles.Positioner}>
            <Dialog.Content class={styles.Content}>
              <Dialog.CloseTrigger class={styles.CloseTrigger}>
                <XIcon />
              </Dialog.CloseTrigger>
              <Dialog.Title class={styles.Title}>Nested Dialog</Dialog.Title>
              <Dialog.Description class={styles.Description}>
                This is a nested dialog with proper z-index layering.
              </Dialog.Description>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.RootProvider>
    </>
  )
}
