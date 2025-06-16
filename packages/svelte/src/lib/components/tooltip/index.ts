export type { OpenChangeDetails as TooltipOpenChangeDetails } from '@zag-js/tooltip'
export { default as TooltipArrow, type TooltipArrowBaseProps, type TooltipArrowProps } from './tooltip-arrow.svelte'
export {
  default as TooltipArrowTip,
  type TooltipArrowTipBaseProps,
  type TooltipArrowTipProps,
} from './tooltip-arrow-tip.svelte'
export {
  default as TooltipContent,
  type TooltipContentBaseProps,
  type TooltipContentProps,
} from './tooltip-content.svelte'
export { default as TooltipContext, type TooltipContextProps } from './tooltip-context.svelte'
export {
  default as TooltipPositioner,
  type TooltipPositionerBaseProps,
  type TooltipPositionerProps,
} from './tooltip-positioner.svelte'
export { default as TooltipRoot, type TooltipRootBaseProps, type TooltipRootProps } from './tooltip-root.svelte'
export {
  default as TooltipRootProvider,
  type TooltipRootProviderBaseProps,
  type TooltipRootProviderProps,
} from './tooltip-root-provider.svelte'
export {
  default as TooltipTrigger,
  type TooltipTriggerBaseProps,
  type TooltipTriggerProps,
} from './tooltip-trigger.svelte'
export { tooltipAnatomy } from './tooltip.anatomy'
export { useTooltipContext, type UseTooltipContext } from './use-tooltip-context'
export { useTooltip, type UseTooltipProps, type UseTooltipReturn } from './use-tooltip.svelte'

export * as Tooltip from './tooltip'
