import { HoverCard } from '@ark-ui/solid/hover-card'
import { createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'

export const Controlled = () => {
  const [isOpen, setOpen] = createSignal(false)
  return (
    <>
      <button type="button" onClick={() => setOpen(!isOpen)}>
        click me
      </button>
      <HoverCard.Root open={isOpen()} onOpenChange={() => setOpen(false)}>
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
    </>
  )
}
