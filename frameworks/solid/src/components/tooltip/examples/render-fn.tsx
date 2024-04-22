import { Portal } from 'solid-js/web'
import { Tooltip } from '../..'

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
