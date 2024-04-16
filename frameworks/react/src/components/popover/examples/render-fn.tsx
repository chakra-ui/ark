import { Popover } from '../..'

export const RenderFn = () => (
  <Popover.Root>
    <Popover.Trigger>Click Me</Popover.Trigger>
    <Popover.Positioner>
      <Popover.Context>
        {(popover) => (
          <Popover.Content>
            <Popover.Title>Title</Popover.Title>
            <Popover.Description>Description: {popover.isOpen.toString()}</Popover.Description>
            <Popover.CloseTrigger>Close</Popover.CloseTrigger>
          </Popover.Content>
        )}
      </Popover.Context>
    </Popover.Positioner>
  </Popover.Root>
)
