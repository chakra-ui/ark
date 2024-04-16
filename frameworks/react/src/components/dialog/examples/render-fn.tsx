import { Dialog, Portal } from '../..'

export const RenderFn = () => (
  <Dialog.Root>
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
    <Dialog.Context>
      {(dialog) => <p>Dialog is {dialog.isOpen ? 'open' : 'closed'}</p>}
    </Dialog.Context>
  </Dialog.Root>
)
