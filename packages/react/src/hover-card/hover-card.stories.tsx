import {
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardInnerArrow,
  HoverCardPortal,
  HoverCardPositioner,
  HoverCardTrigger,
} from '.'
import './hover-card.css'

export const Basic = () => (
  <HoverCard>
    <HoverCardTrigger href="https://mastodon.com/zag_js" target="_blank">
      Mastodon
    </HoverCardTrigger>

    <HoverCardPortal>
      <HoverCardPositioner>
        <HoverCardContent>
          <HoverCardArrow>
            <HoverCardInnerArrow />
          </HoverCardArrow>
          Mastodon Preview
        </HoverCardContent>
      </HoverCardPositioner>
    </HoverCardPortal>
  </HoverCard>
)
