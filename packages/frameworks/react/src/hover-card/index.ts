import type { OpenChangeDetails as HoverCardOpenChangeDetails } from '@zag-js/color-picker'
import { HoverCard as HoverCardRoot, type HoverCardProps } from './hover-card'
import { HoverCardArrow, type HoverCardArrowProps } from './hover-card-arrow'
import { HoverCardArrowTip, type HoverCardArrowTipProps } from './hover-card-arrow-tip'
import { HoverCardContent, type HoverCardContentProps } from './hover-card-content'
import { useHoverCardContext, type HoverCardContext } from './hover-card-context'
import { HoverCardPositioner, type HoverCardPositionerProps } from './hover-card-positioner'
import { HoverCardTrigger, type HoverCardTriggerProps } from './hover-card-trigger'

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
  useHoverCardContext,
}

export type {
  HoverCardArrowProps,
  HoverCardArrowTipProps,
  HoverCardContentProps,
  HoverCardContext,
  HoverCardOpenChangeDetails,
  HoverCardPositionerProps,
  HoverCardProps,
  HoverCardTriggerProps,
}
