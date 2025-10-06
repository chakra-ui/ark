import { Dialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { useState } from 'react'

const promise1 = Promise.resolve()
const promise2 = Promise.resolve()

export const RapidStateChange = () => {
  const [open, setOpen] = useState(false)

  const handleClick = async () => {
    setOpen(true)
    await promise1
    setOpen(false)
    await promise2
    setOpen(true)
  }

  return (
    <>
      <button type="button" onClick={handleClick}>
        Open Dialog {String(open)}
      </button>
      <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Title>Dialog Title</Dialog.Title>
              <Dialog.Description>
                This dialog tests the fix for rapid state changes (true → false → true). If the fix works, the dialog
                should be open after clicking the button.
              </Dialog.Description>
              <Dialog.CloseTrigger onClick={() => setOpen(false)}>Close</Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}
