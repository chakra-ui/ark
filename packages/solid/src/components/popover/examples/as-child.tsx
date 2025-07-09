import { Popover } from '@ark-ui/solid/popover'

export const Basic = () => (
  <Popover.Root>
    <Popover.Trigger asChild={(props) => <button {...props()} />}>Open</Popover.Trigger>
  </Popover.Root>
)
