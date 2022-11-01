import {
  Dialog,
  DialogBackdrop,
  DialogCloseButton,
  DialogContent,
  DialogDescription,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DialogUnderlay,
} from '@atlas/react'

export const ReactDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <button>click me</button>
      </DialogTrigger>
      <DialogPortal>
        <DialogBackdrop />
        <DialogUnderlay />
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Dialog Description</DialogDescription>
          <div>
            <input placeholder="Enter name..." />
            <button>Save</button>
          </div>
          <DialogCloseButton>Close</DialogCloseButton>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
