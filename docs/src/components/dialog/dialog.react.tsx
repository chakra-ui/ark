import {
  Dialog,
  DialogBackdrop,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@atlas/react'

export const ReactDialog = () => {
  return (
    <Dialog defaultOpen>
      <DialogTrigger>
        <button>click me</button>
      </DialogTrigger>
      <Portal>
        <DialogBackdrop />
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog Description</DialogDescription>
          <div>
            <input placeholder="Enter name..." />
            <button>Save</button>
          </div>
          <DialogCloseButton>Close</DialogCloseButton>
        </DialogContent>
      </Portal>
    </Dialog>
  )
}
