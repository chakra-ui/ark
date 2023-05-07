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
} from './'

const meta = {
  title: 'Dialog',
} satisfies Meta

export default meta

export const Basic = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
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
            <DialogCloseTrigger asChild>
              <button>Close</button>
            </DialogCloseTrigger>
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
          <DialogTrigger asChild>
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
          <p>Dialog is {api().isOpen ? 'open' : 'closed'}</p>
        </>
      )}
    </Dialog>
  )
}
