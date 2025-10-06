import { XIcon } from 'lucide-solid'
import { Dialog } from '@ark-ui/solid/dialog'
import { Portal } from 'solid-js/web'

export const AlertDialog = () => {
  return (
    <Dialog.Root role="alertdialog">
      <Dialog.Trigger>Delete Account</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Title>Are you absolutely sure?</Dialog.Title>
            <Dialog.Description>
              This action cannot be undone. This will permanently delete your account and remove your data from our
              servers.
            </Dialog.Description>
            <div>
              <Dialog.CloseTrigger>
                <XIcon />
              </Dialog.CloseTrigger>
              <button type="button">Delete Account</button>
            </div>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
