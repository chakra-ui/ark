import { Popover } from '@ark-ui/react/popover'

export const Render = () => (
  <Popover.Root>
    <Popover.Trigger render={<button type="button">Open Popover</button>} />
    <Popover.Positioner>
      <Popover.Content>Content</Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
)
