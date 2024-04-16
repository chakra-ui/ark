import { createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import { Dialog } from '../..'

export const Controlled = () => {
  const [isOpen, setIsOpen] = createSignal(false)

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open Dialog
      </button>
      <Dialog.Root open={isOpen()} onOpenChange={() => setIsOpen(false)}>
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
      </Dialog.Root>
    </>
  )
}
