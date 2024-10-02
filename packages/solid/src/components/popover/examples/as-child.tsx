// @ts-expect-error
import { Button } from '@acme/ui-lib'
import { Popover } from '@ark-ui/solid/popover'

export const Basic = () => (
  <Popover.Root>
    <Popover.Trigger asChild={(props) => <Button {...props()} />}>Open</Popover.Trigger>
  </Popover.Root>
)
