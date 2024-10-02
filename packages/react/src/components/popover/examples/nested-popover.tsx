import { Popover } from '@ark-ui/react/popover'
import { Portal } from '@ark-ui/react/portal'

const style: React.CSSProperties = {
  width: '200px',
}

export const WithNestedPopover = () => {
  return (
    <Popover.Root>
      <Popover.Trigger>Click Me</Popover.Trigger>
      {/* Note: Only the root popover should use a portal */}
      <Portal>
        <Popover.Positioner>
          <Popover.Content style={style}>
            <Popover.CloseTrigger>Close</Popover.CloseTrigger>
            <Popover.Description>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Popover.Description>
            {/* Nested Popover */}
            <Popover.Root positioning={{ placement: 'right' }}>
              <Popover.Trigger>Open Nested Dialog</Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Title>Title</Popover.Title>
                  <Popover.Description>Description</Popover.Description>
                </Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  )
}
