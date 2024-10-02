import { Tooltip } from '@ark-ui/solid/tooltip'
import { Portal } from 'solid-js/web'

export const Timings = () => (
  <Tooltip.Root closeDelay={0} openDelay={0}>
    <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
    <Portal>
      <Tooltip.Positioner>
        <Tooltip.Content>I am a tooltip!</Tooltip.Content>
      </Tooltip.Positioner>
    </Portal>
  </Tooltip.Root>
)
