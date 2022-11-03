import { Dialog } from './dialog'
import { DialogBackdrop } from './dialog-backdrop'
import { DialogCloseButton } from './dialog-close-button'
import { DialogContent } from './dialog-content'
import { DialogDescription } from './dialog-description'
import { DialogPortal } from './dialog-portal'
import { DialogTitle } from './dialog-title'
import { DialogTrigger } from './dialog-trigger'
import { DialogUnderlay } from './dialog-underlay'

export const Basic = () => {
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
