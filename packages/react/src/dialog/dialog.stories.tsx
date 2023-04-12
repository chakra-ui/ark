import { Portal } from '@zag-js/react'
import { useState } from 'react'
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

export const Controlled = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>Toggle</button>
      <Dialog open={isOpen}>
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
    </>
  )
}

export const DialogWithRenderFn = () => {
  return (
    <Dialog>
      {({ isOpen }) => (
        <>
          <DialogTrigger>
            <button>Open Dialog</button>
          </DialogTrigger>
          <Portal>
            <DialogBackdrop />
            <DialogContainer>
              <DialogContent>
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogDescription>Dialog Description</DialogDescription>
                <DialogCloseTrigger>
                  <button>Close</button>
                </DialogCloseTrigger>
              </DialogContent>
            </DialogContainer>
          </Portal>
          <p>Dialog is {isOpen ? 'open' : 'closed'}</p>
        </>
      )}
    </Dialog>
  )
}
