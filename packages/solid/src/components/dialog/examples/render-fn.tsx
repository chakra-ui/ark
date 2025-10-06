import { XIcon } from 'lucide-solid'
import { Dialog } from '@ark-ui/solid/dialog'
import { Portal } from 'solid-js/web'

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
            <Dialog.CloseTrigger>
              <XIcon />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
      <Dialog.Context>{(context) => <p>Dialog is {context().open ? 'open' : 'closed'}</p>}</Dialog.Context>
    </Dialog.Root>
  )
}
