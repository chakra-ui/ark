import {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from './'

export const Basic = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <button>click me</button>
      </DialogTrigger>
      <DialogPortal>
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
              <button>Close</button>
            </DialogCloseTrigger>
          </DialogContent>
        </DialogContainer>
      </DialogPortal>
    </Dialog>
  )
}
