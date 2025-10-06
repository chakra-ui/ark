import { Dialog } from '@ark-ui/react/dialog'
import { Portal } from '@ark-ui/react/portal'
import { XIcon } from 'lucide-react'
import { useRef } from 'react'

export const InitialFocus = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <Dialog.Root initialFocusEl={() => inputRef.current}>
      <Dialog.Trigger>Open Dialog</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Title>Edit Profile</Dialog.Title>
            <Dialog.Description>
              Make changes to your profile here. The first input will be focused when the dialog opens.
            </Dialog.Description>
            <input ref={inputRef} type="text" placeholder="Enter your name..." />
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
