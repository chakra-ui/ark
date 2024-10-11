import { Tooltip } from '../'

export const ComponentUnderTest = (props: Tooltip.RootProps) => (
  <Tooltip.Root openDelay={0} closeDelay={0} {...props}>
    <Tooltip.Trigger>hover me</Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Arrow>
        <Tooltip.ArrowTip />
      </Tooltip.Arrow>
      <Tooltip.Content>content</Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>
)
