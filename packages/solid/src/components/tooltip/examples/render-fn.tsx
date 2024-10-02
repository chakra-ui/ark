import { Tooltip } from '@ark-ui/solid/tooltip'
import { Portal } from 'solid-js/web'

export const RenderFn = () => (
  <Tooltip.Root>
    <Tooltip.Trigger>Hover Me</Tooltip.Trigger>
    <Portal>
      <Tooltip.Positioner>
        <Tooltip.Context>
          {(context) => (
            <Tooltip.Content>This tooltip is open: {context().open.toString()}</Tooltip.Content>
          )}
        </Tooltip.Context>
      </Tooltip.Positioner>
    </Portal>
  </Tooltip.Root>
)
