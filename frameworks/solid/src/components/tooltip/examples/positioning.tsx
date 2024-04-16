import { Portal } from 'solid-js/web'
import { Tooltip } from '../..'

export const Positioning = () => (
  <Tooltip.Root
    positioning={{ placement: 'left-start', gutter: 16, offset: { mainAxis: 12, crossAxis: 12 } }}
  >
    <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
    <Portal>
      <Tooltip.Positioner>
        <Tooltip.Content>I am a tooltip!</Tooltip.Content>
      </Tooltip.Positioner>
    </Portal>
  </Tooltip.Root>
)
