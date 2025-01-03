import { Popover } from '@ark-ui/solid/popover'
import { ChevronRightIcon } from 'lucide-solid'

export const Basic = () => (
  <Popover.Root>
    <Popover.Trigger>
      Click Me
      <Popover.Indicator>
        <ChevronRightIcon />
      </Popover.Indicator>
    </Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content>
        <Popover.Title>Title</Popover.Title>
        <Popover.Description>Description</Popover.Description>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
)
