import { Popover } from '@ark-ui/solid/popover'

export const AsChild = () => (
  <Popover.Root>
    <Popover.Trigger render={(props) => <button {...props()} />}>Open Popover</Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content>Content</Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
)
