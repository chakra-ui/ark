import { Popover } from '../..'

export const Basic = () => (
  <Popover.Root>
    {/* @ts-expect-error */}
    <Popover.Trigger asChild={(props) => <Button {...props()} />}>Open</Popover.Trigger>
  </Popover.Root>
)
