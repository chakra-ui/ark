import { Popover } from '@ark-ui/react/popover'

export const AsChild = () => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <button>Open</button>
    </Popover.Trigger>
  </Popover.Root>
)
