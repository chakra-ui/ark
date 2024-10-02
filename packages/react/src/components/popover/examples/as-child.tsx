// @ts-expect-error - Required for examples
import { Button } from '@acme/ui-lib'
import { Popover } from '@ark-ui/react/popover'

export const AsChild = () => (
  <Popover.Root>
    <Popover.Trigger asChild>
      <Button>Open</Button>
    </Popover.Trigger>
  </Popover.Root>
)
