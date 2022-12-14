import { Portal } from '@zag-js/react'
import {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './'

export const Basic = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <button>click me</button>
      </DialogTrigger>
      <Portal>
        <DialogBackdrop />
        <DialogContainer>
          <DialogContent>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog Description</DialogDescription>
            <div>
              <input placeholder="Enter name..." />
              <button>Save</button>
            </div>
            <DialogCloseTrigger>
              <button>close</button>
            </DialogCloseTrigger>
          </DialogContent>
        </DialogContainer>
      </Portal>
    </Dialog>
  )
}
