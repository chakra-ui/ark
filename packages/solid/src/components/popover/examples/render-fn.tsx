import { Popover } from '@ark-ui/solid/popover'

export const RenderFn = () => (
  <Popover.Root>
    <Popover.Trigger>Click Me</Popover.Trigger>
    <Popover.Positioner>
      <Popover.Context>
        {(context) => (
          <Popover.Content>
            <Popover.Title>Title</Popover.Title>
            <Popover.Description>Description: {context().open.toString()}</Popover.Description>
            <Popover.CloseTrigger>Close</Popover.CloseTrigger>
          </Popover.Content>
        )}
      </Popover.Context>
    </Popover.Positioner>
  </Popover.Root>
)
