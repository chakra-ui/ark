import { Dialog } from './dialog'
import { DialogBackdrop } from './dialog-backdrop'
import { DialogCloseButton } from './dialog-close-button'
import { DialogContainer } from './dialog-container'
import { DialogContent } from './dialog-content'
import { DialogDescription } from './dialog-description'
import { DialogPortal } from './dialog-portal'
import { DialogTitle } from './dialog-title'
import { DialogTrigger } from './dialog-trigger'

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
            <DialogCloseButton>Close</DialogCloseButton>
          </DialogContent>
        </DialogContainer>
      </DialogPortal>
    </Dialog>
  )
}
