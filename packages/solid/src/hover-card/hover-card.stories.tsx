import {
  HoverCard,
  HoverCardArrow,
  HoverCardArrowTip,
  HoverCardContent,
  HoverCardPortal,
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

    <HoverCardPortal>
      <HoverCardPositioner>
        <HoverCardContent>
          <HoverCardArrow>
            <HoverCardArrowTip />
          </HoverCardArrow>
          Mastodon Preview
        </HoverCardContent>
      </HoverCardPositioner>
    </HoverCardPortal>
  </HoverCard>
)
