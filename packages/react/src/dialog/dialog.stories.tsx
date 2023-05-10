import type { Meta } from '@storybook/react'
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

type DialogType = typeof Dialog

const meta: Meta<DialogType> = {
  title: 'Dialog',
  component: Dialog,
}

export default meta

export const Basic = () => {
  return (
    <Dialog>
      <DialogTrigger>click me</DialogTrigger>
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
            <DialogCloseTrigger>close</DialogCloseTrigger>
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
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
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
              <DialogCloseTrigger>close</DialogCloseTrigger>
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
          <DialogTrigger>Open Dialog</DialogTrigger>
          <Portal>
            <DialogBackdrop />
            <DialogContainer>
              <DialogContent>
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogDescription>Dialog Description</DialogDescription>
                <DialogCloseTrigger>Close</DialogCloseTrigger>
              </DialogContent>
            </DialogContainer>
          </Portal>
          <p>Dialog is {isOpen ? 'open' : 'closed'}</p>
        </>
      )}
    </Dialog>
  )
}
