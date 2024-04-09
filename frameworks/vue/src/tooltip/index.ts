import type { OpenChangeDetails as TooltipOpenChangeDetails } from '@zag-js/tooltip'
import { TooltipArrow, type TooltipArrowProps } from './tooltip-arrow'
import { TooltipArrowTip, type TooltipArrowTipProps } from './tooltip-arrow-tip'
import { TooltipContent, type TooltipContentProps } from './tooltip-content'
import { useTooltipContext, type TooltipContext } from './tooltip-context'
import { TooltipPositioner, type TooltipPositionerProps } from './tooltip-positioner'
import { TooltipRoot, type TooltipRootProps } from './tooltip-root'
import { TooltipTrigger, type TooltipTriggerProps } from './tooltip-trigger'

export * as Tooltip from './tooltip'

export {
  TooltipArrow,
  TooltipArrowTip,
  TooltipContent,
  TooltipPositioner,
  TooltipRoot,
  TooltipTrigger,
  useTooltipContext,
}

export type {
  TooltipArrowProps,
  TooltipArrowTipProps,
  TooltipContentProps,
  TooltipContext,
  TooltipOpenChangeDetails,
  TooltipPositionerProps,
  TooltipRootProps,
  TooltipTriggerProps,
}
