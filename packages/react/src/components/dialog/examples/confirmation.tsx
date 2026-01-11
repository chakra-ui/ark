import { Dialog, useDialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import { useState } from 'react'
import button from 'styles/button.module.css'
import field from 'styles/field.module.css'
import styles from 'styles/dialog.module.css'

export const Confirmation = () => {
  const [formContent, setFormContent] = useState('')
  const [isParentDialogOpen, setIsParentDialogOpen] = useState(false)

  const parentDialog = useDialog({
    open: isParentDialogOpen,
    onOpenChange: (details) => {
      if (!details.open && formContent.trim()) {
        confirmDialog.setOpen(true)
      } else {
        setIsParentDialogOpen(details.open)
      }
    },
  })

  const confirmDialog = useDialog()

  const handleConfirmClose = () => {
    confirmDialog.setOpen(false)
    parentDialog.setOpen(false)
    setFormContent('')
  }

  return (
    <>
      <button className={button.Root} onClick={() => parentDialog.setOpen(true)}>
        Open Form
      </button>

      <Dialog.RootProvider value={parentDialog}>
        <Portal>
          <Dialog.Backdrop className={styles.Backdrop} />
          <Dialog.Positioner className={styles.Positioner}>
            <Dialog.Content className={styles.Content}>
              <Dialog.CloseTrigger className={styles.CloseTrigger}>
                <XIcon />
              </Dialog.CloseTrigger>
              <Dialog.Title className={styles.Title}>Edit Content</Dialog.Title>
              <Dialog.Description className={styles.Description}>
                Make changes to your content. You'll be asked to confirm before closing if there are unsaved changes.
              </Dialog.Description>
              <div className={styles.Body}>
                <textarea
                  className={field.Textarea}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
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
          <Dialog.Backdrop className={styles.Backdrop} />
          <Dialog.Positioner className={styles.Positioner}>
            <Dialog.Content className={styles.Content}>
              <Dialog.CloseTrigger className={styles.CloseTrigger}>
                <XIcon />
              </Dialog.CloseTrigger>
              <Dialog.Title className={styles.Title}>Unsaved Changes</Dialog.Title>
              <Dialog.Description className={styles.Description}>
                You have unsaved changes. Are you sure you want to close without saving?
              </Dialog.Description>
              <div className={styles.Actions}>
                <button className={button.Root} onClick={() => confirmDialog.setOpen(false)}>
                  Keep Editing
                </button>
                <button className={button.Root} data-variant="solid" onClick={handleConfirmClose}>
                  Discard Changes
                </button>
              </div>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.RootProvider>
    </>
  )
}
