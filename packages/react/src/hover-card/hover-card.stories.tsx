import type { Meta } from '@storybook/react'
import { Portal } from '@zag-js/react'
import { useState } from 'react'
import {
  HoverCard,
  HoverCardArrow,
  HoverCardArrowTip,
  HoverCardContent,
  HoverCardPositioner,
  HoverCardTrigger,
} from '.'
import './hover-card.css'

type HoverCardType = typeof HoverCard

const meta: Meta<HoverCardType> = {
  title: 'HoverCard',
  component: HoverCard,
}

export default meta

export const Basic = () => (
  <HoverCard>
    <HoverCardTrigger>Hover me</HoverCardTrigger>
    <Portal>
      <HoverCardPositioner>
        <HoverCardContent>
          <HoverCardArrow>
            <HoverCardArrowTip />
          </HoverCardArrow>
          Content
        </HoverCardContent>
      </HoverCardPositioner>
    </Portal>
  </HoverCard>
)

export const Controlled = () => {
  const [isOpen, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(!isOpen)}>click me</button>
      <HoverCard open={isOpen} onClose={() => setOpen(false)}>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
        <Portal>
          <HoverCardPositioner>
            <HoverCardContent>
              <HoverCardArrow>
                <HoverCardArrowTip />
              </HoverCardArrow>
              Content
            </HoverCardContent>
          </HoverCardPositioner>
        </Portal>
      </HoverCard>
    </>
  )
}

export const Positioning = () => (
  <HoverCard positioning={{ placement: 'right', gutter: 12 }}>
    <HoverCardTrigger>Hover me</HoverCardTrigger>
    <Portal>
      <HoverCardPositioner>
        <HoverCardContent>
          <HoverCardArrow>
            <HoverCardArrowTip />
          </HoverCardArrow>
          Content
        </HoverCardContent>
      </HoverCardPositioner>
    </Portal>
  </HoverCard>
)

export const RenderProp = () => (
  <HoverCard>
    {(api) => (
      <>
        <HoverCardTrigger>Hover me {api.isOpen ? '▲' : '▼'} </HoverCardTrigger>
        <Portal>
          <HoverCardPositioner>
            <HoverCardContent>
              <HoverCardArrow>
                <HoverCardArrowTip />
              </HoverCardArrow>
              Content
            </HoverCardContent>
          </HoverCardPositioner>
        </Portal>
      </>
    )}
  </HoverCard>
)
