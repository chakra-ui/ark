import { XIcon } from 'lucide-solid'
import { Dialog } from '@ark-ui/solid/dialog'
import { Portal } from 'solid-js/web'

export const FinalFocus = () => {
  let finalRef: HTMLButtonElement | null = null

  return (
    <>
      <button type="button" ref={finalRef!}>
        I will receive focus when dialog closes
      </button>
      <Dialog.Root finalFocusEl={() => finalRef}>
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
