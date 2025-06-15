import { Portal } from '@ark-ui/react/portal'
import { Tooltip } from '@ark-ui/react/tooltip'

export const WithinFixed = () => (
  <div style={{ position: 'fixed', top: '40px', left: '40px', padding: '40px', background: 'red' }}>
    <Tooltip.Root positioning={{ strategy: 'fixed' }}>
      <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
      <Portal>
        <Tooltip.Positioner>
          <Tooltip.Content>I am a tooltip!</Tooltip.Content>
        </Tooltip.Positioner>
      </Portal>
    </Tooltip.Root>
  </div>
)
