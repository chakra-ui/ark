import { Popover } from '@ark-ui/react/popover'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

export const RenderState = () => (
  <Popover.Root>
    <Popover.Trigger
      render={(props, state) => (
        <button type="button" {...props}>
          {state.open ? 'Close' : 'Open'} Popover
          {state.open ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>
      )}
    />
    <Popover.Positioner>
      <Popover.Content>Content</Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
)
