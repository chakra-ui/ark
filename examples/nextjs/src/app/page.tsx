'use client'
import { Dialog, Popover, Portal } from '@ark-ui/react'

export default function Home() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>Open Dialog</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Container>
          <Dialog.Content>
            <Dialog.Title>Dialog Title</Dialog.Title>
            <Dialog.Description>Dialog Description</Dialog.Description>
            <Popover.Root>
              <Popover.Trigger>Click Me</Popover.Trigger>
              <Portal disabled>
                <Popover.Positioner>
                  <Popover.Content>
                    <Popover.Title>Title</Popover.Title>
                    <Popover.Description>Description</Popover.Description>
                    <Popover.CloseTrigger>Close</Popover.CloseTrigger>
                  </Popover.Content>
                </Popover.Positioner>
              </Portal>
            </Popover.Root>
            <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Container>
      </Portal>
    </Dialog.Root>
  )
}
