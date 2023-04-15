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

export const Basic = () => (
  <HoverCard>
    <HoverCardTrigger>
      <a href="https://mastodon.com/zag_js" target="_blank" rel="noreferrer">
        Mastodon
      </a>
    </HoverCardTrigger>

    <Portal>
      <HoverCardPositioner>
        <HoverCardContent>
          <HoverCardArrow>
            <HoverCardArrowTip />
          </HoverCardArrow>
          Mastodon Preview
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
      <HoverCard open={isOpen} onClose={() => setOpen(false)} openDelay={0} closeDelay={0}>
        <HoverCardTrigger>
          <a href="https://mastodon.com/zag_js" target="_blank" rel="noreferrer">
            Mastodon
          </a>
        </HoverCardTrigger>
        <Portal>
          <HoverCardPositioner>
            <HoverCardContent>
              <HoverCardArrow>
                <HoverCardArrowTip />
              </HoverCardArrow>
              Mastodon Preview
            </HoverCardContent>
          </HoverCardPositioner>
        </Portal>
      </HoverCard>
    </>
  )
}
