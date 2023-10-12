import type { Meta } from '@storybook/react'
import { useState } from 'react'
import { Portal } from '../portal'
import { Dialog } from './'
import './Dialog.css'

type DialogType = typeof Dialog

const meta: Meta<DialogType> = {
  title: 'Dialog',
  component: Dialog,
}

export default meta

export const Basic = () => (
  <Dialog.Root>
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Container>
        <Dialog.Content>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>Dialog Description</Dialog.Description>
          <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Container>
    </Portal>
  </Dialog.Root>
)

export const Controlled = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Dialog</button>
      <Dialog.Root open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Container>
            <Dialog.Content>
              <Dialog.Title>Dialog Title</Dialog.Title>
              <Dialog.Description>Dialog Description</Dialog.Description>
              <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Container>
        </Portal>
      </Dialog.Root>
    </>
  )
}

export const LazyMount = () => (
  <Dialog.Root>
    <Dialog.Trigger>Open Dialog</Dialog.Trigger>
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Container>
        <Dialog.Content lazyMount unmountOnExit>
          <Dialog.Title>Dialog Title</Dialog.Title>
          <Dialog.Description>Dialog Description</Dialog.Description>
          <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Container>
    </Portal>
  </Dialog.Root>
)

export const RenderFn = () => (
  <Dialog.Root>
    {({ isOpen }) => (
      <>
        <Dialog.Trigger>Open Dialog</Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Container>
            <Dialog.Content>
              <Dialog.Title>Dialog Title</Dialog.Title>
              <Dialog.Description>Dialog Description</Dialog.Description>
              <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Container>
        </Portal>
        <p>Dialog is {isOpen ? 'open' : 'closed'}</p>
      </>
    )}
  </Dialog.Root>
)
