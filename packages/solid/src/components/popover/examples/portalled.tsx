import { Portal } from 'solid-js/web'
import { Popover } from '../..'

export const Portalled = () => (
  <Popover.Root portalled>
    <Popover.Trigger>
      Click Me <Popover.Indicator>{'>'}</Popover.Indicator>
    </Popover.Trigger>
    <Portal>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Title>Title</Popover.Title>
          <Popover.Description>Description</Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Portal>
  </Popover.Root>
)
