import { XIcon } from 'lucide-solid'
import { Dialog } from '@ark-ui/solid/dialog'
import { Portal } from 'solid-js/web'

export const CloseOnInteractOutside = () => {
  return (
    <Dialog.Root
      closeOnInteractOutside={false}
      onInteractOutside={(e) => {
        const target = e.target as HTMLElement
        if (target.closest('[data-allow-close]')) {
          return
        }
        e.preventDefault()
      }}
    >
      <Dialog.Trigger>Open Dialog</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Title>Custom Close Behavior</Dialog.Title>
            <Dialog.Description>
              This dialog will not close when clicking outside. Try clicking the backdrop or pressing Escape to see that
              it stays open. Only the close button will dismiss it.
            </Dialog.Description>
            <Dialog.CloseTrigger>
              <XIcon />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
