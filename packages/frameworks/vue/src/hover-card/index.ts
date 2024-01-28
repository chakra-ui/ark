import type { OpenChangeDetails as HoverCardOpenChangeDetails } from '@zag-js/color-picker'
import { HoverCardArrow, type HoverCardArrowProps } from './hover-card-arrow'
import { HoverCardArrowTip, type HoverCardArrowTipProps } from './hover-card-arrow-tip'
import { HoverCardContent, type HoverCardContentProps } from './hover-card-content'
import { useHoverCardContext, type HoverCardContext } from './hover-card-context'
import { HoverCardPositioner, type HoverCardPositionerProps } from './hover-card-positioner'
import { HoverCardRoot, type HoverCardRootProps } from './hover-card-root'
import { HoverCardTrigger, type HoverCardTriggerProps } from './hover-card-trigger'

export const HoverCard = {
  Root: HoverCardRoot,
  Arrow: HoverCardArrow,
  ArrowTip: HoverCardArrowTip,
  Content: HoverCardContent,
  Positioner: HoverCardPositioner,
  Trigger: HoverCardTrigger,
}

export {
  HoverCardArrow,
  HoverCardArrowTip,
  HoverCardContent,
  HoverCardPositioner,
  HoverCardRoot,
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
  HoverCardRootProps,
  HoverCardTriggerProps,
}
