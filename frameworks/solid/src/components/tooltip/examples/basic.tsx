import { Portal } from 'solid-js/web'
import { Tooltip } from '../..'

export const Basic = () => (
  <Tooltip.Root open>
    <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
    <Portal>
      <Tooltip.Positioner>
        <Tooltip.Content>I am a tooltip!</Tooltip.Content>
      </Tooltip.Positioner>
    </Portal>
  </Tooltip.Root>
)
