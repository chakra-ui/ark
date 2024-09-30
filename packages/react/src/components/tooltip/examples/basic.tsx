import { Tooltip } from '../..'

export const Basic = () => (
  <Tooltip.Root>
    <Tooltip.Trigger disabled>Hover Me</Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Content>I am a tooltip!</Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>
)
