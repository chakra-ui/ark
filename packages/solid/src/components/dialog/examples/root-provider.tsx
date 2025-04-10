import { Dialog, useDialog } from '@ark-ui/solid/dialog'
import { Portal } from 'solid-js/web'

export const RootProvider = () => {
  const dialog = useDialog()

  return (
    <>
      <button onClick={() => dialog().setOpen(true)}>Open</button>

      <Dialog.RootProvider value={dialog}>
        <Dialog.Trigger>Open Dialog</Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Title>Dialog Title</Dialog.Title>
              <Dialog.Description>Dialog Description</Dialog.Description>
              <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.RootProvider>
    </>
  )
}
