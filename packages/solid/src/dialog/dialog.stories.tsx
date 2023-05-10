import { Portal } from 'solid-js/web'
import type { Meta } from 'storybook-solidjs'
import {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContainer,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '.'
import './dialog.css'

const meta: Meta = {
  title: 'Dialog',
}

export default meta

export const Basic = () => {
  return (
    <Dialog>
      <DialogTrigger>Open Dialog</DialogTrigger>
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
            <DialogCloseTrigger>Close</DialogCloseTrigger>
          </DialogContent>
        </DialogContainer>
      </Portal>
    </Dialog>
  )
}

export const DialogWithRenderFn = () => {
  return (
    <Dialog>
      {(api) => (
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
          <p>Dialog is {api().isOpen ? 'open' : 'closed'}</p>
        </>
      )}
    </Dialog>
  )
}
