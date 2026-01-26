import { Popover } from '@ark-ui/react/popover'

export const AsChild = () => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <button>Open Popover</button>
    </Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content>Content</Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
)
