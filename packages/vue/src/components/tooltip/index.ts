export type { OpenChangeDetails as TooltipOpenChangeDetails } from '@zag-js/tooltip'
export { default as TooltipArrowTip, type TooltipArrowTipProps } from './tooltip-arrow-tip.vue'
export { default as TooltipArrow, type TooltipArrowProps } from './tooltip-arrow.vue'
export { default as TooltipContent, type TooltipContentProps } from './tooltip-content.vue'
export { default as TooltipContext, type TooltipContextProps } from './tooltip-context.vue'
export { default as TooltipPositioner, type TooltipPositionerProps } from './tooltip-positioner.vue'
export {
  default as TooltipRootProvider,
  type TooltipRootProviderProps,
} from './tooltip-root-provider.vue'
export {
  default as TooltipRoot,
  type TooltipRootEmits,
  type TooltipRootProps,
} from './tooltip-root.vue'
export { default as TooltipTrigger, type TooltipTriggerProps } from './tooltip-trigger.vue'
export { useTooltip, type UseTooltipProps, type UseTooltipReturn } from './use-tooltip'
export { useTooltipContext, type UseTooltipContext } from './use-tooltip-context'

export * as Tooltip from './tooltip'
