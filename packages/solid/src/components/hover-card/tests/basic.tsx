import { Portal } from 'solid-js/web'
import { HoverCard } from '../'

export const ComponentUnderTest = (props: HoverCard.RootProps) => (
  <HoverCard.Root openDelay={0} closeDelay={0} {...props}>
    <HoverCard.Trigger>Hover me</HoverCard.Trigger>
    <Portal>
      <HoverCard.Positioner data-testid="positioner">
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
