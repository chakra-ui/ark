import { Popover } from '@ark-ui/solid/popover'

export const Modal = () => (
  <Popover.Root modal>
    <Popover.Trigger>Click Me</Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content>
        <Popover.Title>Title</Popover.Title>
        <Popover.Description>Description</Popover.Description>
        <Popover.CloseTrigger>Close</Popover.CloseTrigger>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
)
