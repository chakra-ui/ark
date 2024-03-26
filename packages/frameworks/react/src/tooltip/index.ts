import type { OpenChangeDetails as TooltipOpenChangeDetails } from '@zag-js/tooltip'
import { TooltipArrow, type TooltipArrowProps } from './tooltip-arrow'
import { TooltipArrowTip, type TooltipArrowTipProps } from './tooltip-arrow-tip'
import { TooltipContent, type TooltipContentProps } from './tooltip-content'
import { TooltipContext, type TooltipContextProps } from './tooltip-context'
import { TooltipPositioner, type TooltipPositionerProps } from './tooltip-positioner'
import { TooltipRoot, type TooltipRootProps } from './tooltip-root'
import { TooltipTrigger, type TooltipTriggerProps } from './tooltip-trigger'
import { useTooltipContext, type UseTooltipContext } from './use-tooltip-context'

export * as Tooltip from './tooltip'

export {
  TooltipArrow,
  TooltipArrowTip,
  TooltipContent,
  TooltipContext,
  TooltipPositioner,
  TooltipRoot,
  TooltipTrigger,
  useTooltipContext,
}

export type {
  TooltipArrowProps,
  TooltipArrowTipProps,
  TooltipContentProps,
  TooltipContextProps,
  TooltipOpenChangeDetails,
  TooltipPositionerProps,
  TooltipRootProps,
  TooltipTriggerProps,
  UseTooltipContext,
}
