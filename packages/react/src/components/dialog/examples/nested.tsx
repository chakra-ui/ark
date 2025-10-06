import { Dialog, useDialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'

export const Nested = () => {
  const parentDialog = useDialog()
  const childDialog = useDialog()

  return (
    <>
      <button onClick={() => parentDialog.setOpen(true)}>Open Parent Dialog</button>

      <Dialog.RootProvider value={parentDialog}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Title>Parent Dialog</Dialog.Title>
              <Dialog.Description>
                This is the parent dialog. Open a nested dialog from here to see automatic z-index management via CSS
                variables like --z-index and --layer-index.
              </Dialog.Description>
              <button onClick={() => childDialog.setOpen(true)}>Open Nested Dialog</button>
              <Dialog.CloseTrigger>
                <XIcon />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.RootProvider>

      <Dialog.RootProvider value={childDialog}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Title>Nested Dialog</Dialog.Title>
              <Dialog.Description>
                This dialog is nested within the parent. Notice how it layers on top with proper z-index management.
              </Dialog.Description>
              <button onClick={() => parentDialog.setOpen(false)}>Close Parent Dialog</button>
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
