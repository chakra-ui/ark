import { Dialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'

export const CloseOnEscape = () => (
  <Dialog.Root
    closeOnEscape={false}
    onEscapeKeyDown={(e) => {
      const hasUnsavedChanges = true
      if (hasUnsavedChanges) {
        e.preventDefault()
        alert('You have unsaved changes. Please save or discard them before closing.')
      }
    }}
  >
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Unsaved Changes</Dialog.Title>
          <Dialog.Description>
            This dialog prevents closing with Escape key. Try pressing Escape to see the warning. Use the close button
            to dismiss.
          </Dialog.Description>
          <textarea placeholder="Type something..." rows={4} style={{ width: '100%' }} />
          <Dialog.CloseTrigger>
            <XIcon />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  </Dialog.Root>
)
