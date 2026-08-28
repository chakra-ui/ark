export type {
  OpenChangeDetails as TooltipOpenChangeDetails,
  TriggerValueChangeDetails as TooltipTriggerValueChangeDetails,
} from '@zag-js/tooltip'
export { TooltipArrow, type TooltipArrowBaseProps, type TooltipArrowProps } from './tooltip-arrow.tsx'
export { TooltipArrowTip, type TooltipArrowTipBaseProps, type TooltipArrowTipProps } from './tooltip-arrow-tip.tsx'
export { TooltipContent, type TooltipContentBaseProps, type TooltipContentProps } from './tooltip-content.tsx'
export { TooltipContext, type TooltipContextProps } from './tooltip-context.tsx'
export {
  TooltipPositioner,
  type TooltipPositionerBaseProps,
  type TooltipPositionerProps,
} from './tooltip-positioner.tsx'
export { TooltipRoot, type TooltipRootBaseProps, type TooltipRootProps } from './tooltip-root.tsx'
export {
  TooltipRootProvider,
  type TooltipRootProviderBaseProps,
  type TooltipRootProviderProps,
} from './tooltip-root-provider.tsx'
export { TooltipTrigger, type TooltipTriggerBaseProps, type TooltipTriggerProps } from './tooltip-trigger.tsx'
export { tooltipAnatomy } from './tooltip.anatomy.ts'
export { useTooltip, type UseTooltipProps, type UseTooltipReturn } from './use-tooltip.ts'
export { useTooltipContext, type UseTooltipContext } from './use-tooltip-context.ts'

export * as Tooltip from './tooltip.ts'
