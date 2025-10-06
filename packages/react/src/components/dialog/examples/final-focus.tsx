import { Dialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import { useRef } from 'react'

export const FinalFocus = () => {
  const finalRef = useRef<HTMLButtonElement>(null)

  return (
    <>
      <button type="button" ref={finalRef}>
        I will receive focus when dialog closes
      </button>
      <Dialog.Root finalFocusEl={() => finalRef.current}>
        <Dialog.Trigger>Open Dialog</Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Title>Dialog Title</Dialog.Title>
              <Dialog.Description>
                When this dialog closes, focus will return to the button above instead of the trigger.
              </Dialog.Description>
              <Dialog.CloseTrigger>
                <XIcon />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  )
}
