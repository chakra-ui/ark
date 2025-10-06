import { Dialog, useDialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import { useState } from 'react'

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
      <button onClick={() => parentDialog.setOpen(true)}>Open Form</button>

      <Dialog.RootProvider value={parentDialog}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Title>Edit Content</Dialog.Title>
              <Dialog.Description>
                Make changes to your content. If you have unsaved changes, you'll be asked to confirm before closing.
              </Dialog.Description>
              <textarea
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
                placeholder="Enter some text..."
                rows={4}
                style={{ width: '100%' }}
              />
              <Dialog.CloseTrigger>
                <XIcon />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.RootProvider>

      <Dialog.RootProvider value={confirmDialog}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Title>Unsaved Changes</Dialog.Title>
              <Dialog.Description>
                You have unsaved changes. Are you sure you want to close without saving?
              </Dialog.Description>
              <div>
                <button onClick={() => confirmDialog.setOpen(false)}>Keep Editing</button>
                <button onClick={handleConfirmClose}>Discard Changes</button>
              </div>
              <Dialog.CloseTrigger>
                <XIcon />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.RootProvider>
    </>
  )
}
