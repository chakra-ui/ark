import { Dialog, useDialog } from '@ark-ui/solid/dialog'
import { XIcon } from 'lucide-solid'
import { createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import button from 'styles/button.module.css'
import styles from 'styles/dialog.module.css'

export const Confirmation = () => {
  const [formContent, setFormContent] = createSignal('')
  const parentDialog = useDialog({
    onOpenChange: (details) => {
      if (!details.open && formContent().trim()) {
        confirmDialog().setOpen(true)
      }
    },
  })
  const confirmDialog = useDialog()

  const handleConfirmClose = () => {
    confirmDialog().setOpen(false)
    parentDialog().setOpen(false)
    setFormContent('')
  }

  return (
    <>
      <button class={button.Root} onClick={() => parentDialog().setOpen(true)}>
        Open Form
      </button>

      <Dialog.RootProvider value={parentDialog}>
        <Portal>
          <Dialog.Backdrop class={styles.Backdrop} />
          <Dialog.Positioner class={styles.Positioner}>
            <Dialog.Content class={styles.Content}>
              <Dialog.CloseTrigger class={styles.CloseTrigger}>
                <XIcon />
              </Dialog.CloseTrigger>
              <Dialog.Title class={styles.Title}>Edit Content</Dialog.Title>
              <Dialog.Description class={styles.Description}>
                Make changes to your content. You'll be asked to confirm if you have unsaved changes.
              </Dialog.Description>
              <div class={styles.Body}>
                <textarea
                  value={formContent()}
                  onInput={(e) => setFormContent(e.currentTarget.value)}
                  placeholder="Enter some text..."
                  rows={4}
                />
              </div>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.RootProvider>

      <Dialog.RootProvider value={confirmDialog}>
        <Portal>
          <Dialog.Backdrop class={styles.Backdrop} />
          <Dialog.Positioner class={styles.Positioner}>
            <Dialog.Content class={styles.Content}>
              <Dialog.Title class={styles.Title}>Unsaved Changes</Dialog.Title>
              <Dialog.Description class={styles.Description}>
                You have unsaved changes. Are you sure you want to discard them?
              </Dialog.Description>
              <div class={styles.Actions}>
                <button class={button.Root} onClick={() => confirmDialog().setOpen(false)}>
                  Keep Editing
                </button>
                <button class={button.Root} onClick={handleConfirmClose}>
                  Discard
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.RootProvider>
    </>
  )
}
