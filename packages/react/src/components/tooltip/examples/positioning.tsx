import { Tooltip } from '@ark-ui/react/tooltip'

export const Positioning = () => (
  <Tooltip.Root
    positioning={{
      placement: 'left-start',
      offset: { mainAxis: 12, crossAxis: 12 },
    }}
  >
    <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
    <Tooltip.Positioner>
      <Tooltip.Content>I am a tooltip!</Tooltip.Content>
    </Tooltip.Positioner>
  </Tooltip.Root>
)
