import { Portal } from 'solid-js/web'
import { Popover } from '../..'

export const CloseBehavior = () => (
  <Popover.Root closeOnEsc={false} closeOnInteractOutside={false}>
    <Popover.Trigger>Click Me</Popover.Trigger>
    <Portal>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>Title</Popover.Title>
          <Popover.Description>Description</Popover.Description>
          <Popover.CloseTrigger>Close</Popover.CloseTrigger>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
)
