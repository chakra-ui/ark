import { Popover } from '../..'

export const AsChild = () => (
  <Popover.Root>
    <Popover.Trigger asChild>
      {/* @ts-expect-error */}
      <Button>Open</Button>
    </Popover.Trigger>
  </Popover.Root>
)
