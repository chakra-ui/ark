import { Dialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { useState } from 'react'

export const Controlled = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open Dialog
      </button>
      <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
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
