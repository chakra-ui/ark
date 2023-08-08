import { HoverCard as HoverCardRoot, type HoverCardProps } from './hover-card'
import { HoverCardArrow, type HoverCardArrowProps } from './hover-card-arrow'
import { HoverCardArrowTip, type HoverCardArrowTipProps } from './hover-card-arrow-tip'
import { HoverCardContent, type HoverCardContentProps } from './hover-card-content'
import { useHoverCardContext } from './hover-card-context'
import { HoverCardPositioner, type HoverCardPositionerProps } from './hover-card-positioner'
import { HoverCardTrigger, type HoverCardTriggerProps } from './hover-card-trigger'
import { hoverCardAnatomy } from './hover-card.anatomy'

const HoverCard = Object.assign(HoverCardRoot, {
  Root: HoverCardRoot,
  Arrow: HoverCardArrow,
  ArrowTip: HoverCardArrowTip,
  Content: HoverCardContent,
  Positioner: HoverCardPositioner,
  Trigger: HoverCardTrigger,
})

export {
  HoverCard,
  HoverCardArrow,
  HoverCardArrowTip,
  HoverCardContent,
  HoverCardPositioner,
  HoverCardTrigger,
  hoverCardAnatomy,
  useHoverCardContext,
}

export type {
  HoverCardArrowProps,
  HoverCardArrowTipProps,
  HoverCardContentProps,
  HoverCardPositionerProps,
  HoverCardProps,
  HoverCardTriggerProps,
}
