import {
  HoverCard,
  HoverCardArrow,
  HoverCardContent,
  HoverCardInnerArrow,
  HoverCardPortal,
  HoverCardPositioner,
  HoverCardTrigger,
} from '.'

export const Basic = () => (
  <HoverCard>
    <HoverCardTrigger href="https://twitter.com/zag_js" target="_blank">
      Twitter
    </HoverCardTrigger>

    <HoverCardPortal>
      <HoverCardPositioner>
        <HoverCardContent>
          <HoverCardArrow>
            <HoverCardInnerArrow />
          </HoverCardArrow>
          Twitter Preview
        </HoverCardContent>
      </HoverCardPositioner>
    </HoverCardPortal>
  </HoverCard>
)
