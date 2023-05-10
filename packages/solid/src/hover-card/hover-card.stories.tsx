import { Portal } from 'solid-js/web'
import type { Meta } from 'storybook-solidjs'
import {
  HoverCard,
  HoverCardArrow,
  HoverCardArrowTip,
  HoverCardContent,
  HoverCardPositioner,
  HoverCardTrigger,
} from '.'
import './hover-card.css'

const meta: Meta = {
  title: 'HoverCard',
}

export default meta

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
