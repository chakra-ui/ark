import { Popover } from '@ark-ui/react/popover'
import { Portal } from '@ark-ui/react/portal'
import { ChevronRightIcon } from 'lucide-react'

export const Portalled = () => (
  <Popover.Root portalled>
    <Popover.Trigger>
      Click Me
      <Popover.Indicator>
        <ChevronRightIcon />
      </Popover.Indicator>
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
