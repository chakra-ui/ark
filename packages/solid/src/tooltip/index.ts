import { Tooltip as TooltipRoot, type TooltipProps } from './tooltip'
import { tooltipAnatomy } from './tooltip-anatomy'
import { TooltipArrow, type TooltipArrowProps } from './tooltip-arrow'
import { TooltipArrowTip, type TooltipArrowTipProps } from './tooltip-arrow-tip'
import { TooltipContent, type TooltipContentProps } from './tooltip-content'
import { useTooltipContext } from './tooltip-context'
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
  tooltipAnatomy,
  useTooltipContext,
}

export type {
  TooltipArrowProps,
  TooltipArrowTipProps,
  TooltipContentProps,
  TooltipPositionerProps,
  TooltipProps,
  TooltipTriggerProps,
}
