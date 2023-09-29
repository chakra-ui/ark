import type { Meta } from '@storybook/react'
import { Portal } from '@zag-js/react'
import { useState } from 'react'
import { HoverCard } from './'
import './hover-card.css'

type HoverCardType = typeof HoverCard

const meta: Meta<HoverCardType> = {
  title: 'HoverCard',
  component: HoverCard,
}

export default meta

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

export const Controlled = () => {
  const [isOpen, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(!isOpen)}>click me</button>
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

export const Positioning = () => (
  <HoverCard.Root positioning={{ placement: 'right', gutter: 12 }}>
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

export const RenderProp = () => (
  <HoverCard.Root>
    {(api) => (
      <>
        <HoverCard.Trigger>Hover me {api.isOpen ? '▲' : '▼'} </HoverCard.Trigger>
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
      </>
    )}
  </HoverCard.Root>
)
