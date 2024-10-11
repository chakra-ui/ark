import { HoverCard } from '@ark-ui/solid/hover-card'
import { Portal } from 'solid-js/web'

export const Basic = () => (
  <HoverCard.Root>
    <HoverCard.Trigger>Hover me</HoverCard.Trigger>
    <Portal>
      <HoverCard.Positioner>
        <HoverCard.Content>
          <HoverCard.Arrow>
            <HoverCard.ArrowTip />
          </HoverCard.Arrow>
          Content
        </HoverCard.Content>
      </HoverCard.Positioner>
    </Portal>
  </HoverCard.Root>
)
