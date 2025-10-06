import { XIcon } from 'lucide-solid'
import { Dialog } from '@ark-ui/solid/dialog'
import { createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'

export const Controlled = () => {
  const [open, setOpen] = createSignal(false)

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Open Dialog
      </button>
      <Dialog.Root open={open()} onOpenChange={() => setOpen(false)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Title>Dialog Title</Dialog.Title>
              <Dialog.Description>Dialog Description</Dialog.Description>
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
