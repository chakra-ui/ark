import type { OpenChangeDetails as TooltipOpenChangeDetails } from '@zag-js/tooltip'
import { Tooltip as TooltipRoot, type TooltipProps } from './tooltip'
import { TooltipArrow, type TooltipArrowProps } from './tooltip-arrow'
import { TooltipArrowTip, type TooltipArrowTipProps } from './tooltip-arrow-tip'
import { TooltipContent, type TooltipContentProps } from './tooltip-content'
import { useTooltipContext, type TooltipContext } from './tooltip-context'
import { TooltipPositioner, type TooltipPositionerProps } from './tooltip-positioner'
import { TooltipTrigger, type TooltipTriggerProps } from './tooltip-trigger'

const Tooltip = Object.assign(TooltipRoot, {
  Root: TooltipRoot,
  Arrow: TooltipArrow,
  ArrowTip: TooltipArrowTip,
  Content: TooltipContent,
  Positioner: TooltipPositioner,
  Trigger: TooltipTrigger,
})

export {
  Tooltip,
  TooltipArrow,
  TooltipArrowTip,
  TooltipContent,
  TooltipPositioner,
  TooltipTrigger,
  useTooltipContext
}

export type {
  TooltipArrowProps,
  TooltipArrowTipProps,
  TooltipContentProps,
  TooltipContext,
  TooltipOpenChangeDetails,
  TooltipPositionerProps,
  TooltipProps,
  TooltipTriggerProps
}

