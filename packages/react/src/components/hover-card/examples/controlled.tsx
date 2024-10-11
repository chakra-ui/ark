import { HoverCard } from '@ark-ui/react/hover-card'
import { Portal } from '@ark-ui/react/portal'
import { useState } from 'react'

export const Controlled = () => {
  const [isOpen, setOpen] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setOpen(!isOpen)}>
        click me
      </button>
      <HoverCard.Root open={isOpen} onOpenChange={() => setOpen(false)}>
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
