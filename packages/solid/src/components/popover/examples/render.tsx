import { Popover } from '@ark-ui/solid/popover'

export const Render = () => (
  <Popover.Root>
    <Popover.Trigger render={(props) => <button type="button" {...props} />}>Open Popover</Popover.Trigger>
    <Popover.Positioner>
      <Popover.Content>Content</Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
)
