import { Portal } from 'solid-js/web'
import { Dialog } from '../..'

export const RenderFn = () => {
  return (
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
        {(context) => <p>Dialog is {context().isOpen ? 'open' : 'closed'}</p>}
      </Dialog.Context>
    </Dialog.Root>
  )
}
