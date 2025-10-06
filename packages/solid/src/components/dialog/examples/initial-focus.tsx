import { XIcon } from 'lucide-solid'
import { Dialog } from '@ark-ui/solid/dialog'
import { Portal } from 'solid-js/web'

export const InitialFocus = () => {
  let inputRef: HTMLInputElement | null = null

  return (
    <Dialog.Root initialFocusEl={() => inputRef}>
      <Dialog.Trigger>Open Dialog</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Title>Edit Profile</Dialog.Title>
            <Dialog.Description>
              Make changes to your profile here. The first input will be focused when the dialog opens.
            </Dialog.Description>
            <input ref={inputRef!} type="text" placeholder="Enter your name..." />
            <input type="email" placeholder="Enter your email..." />
            <Dialog.CloseTrigger>
              <XIcon />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
