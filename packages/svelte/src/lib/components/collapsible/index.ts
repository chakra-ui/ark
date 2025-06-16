export type { OpenChangeDetails as CollapsibleOpenChangeDetails } from '@zag-js/collapsible'
export {
  default as CollapsibleContent,
  type CollapsibleContentBaseProps,
  type CollapsibleContentProps,
} from './collapsible-content.svelte'
export { default as CollapsibleContext, type CollapsibleContextProps } from './collapsible-context.svelte'
export {
  default as CollapsibleIndicator,
  type CollapsibleIndicatorBaseProps,
  type CollapsibleIndicatorProps,
} from './collapsible-indicator.svelte'
export {
  default as CollapsibleRoot,
  type CollapsibleRootBaseProps,
  type CollapsibleRootProps,
} from './collapsible-root.svelte'
export {
  default as CollapsibleRootProvider,
  type CollapsibleRootProviderBaseProps,
  type CollapsibleRootProviderProps,
} from './collapsible-root-provider.svelte'
export {
  default as CollapsibleTrigger,
  type CollapsibleTriggerBaseProps,
  type CollapsibleTriggerProps,
} from './collapsible-trigger.svelte'
export { collapsibleAnatomy } from './collapsible.anatomy'
export { splitCollapsibleProps } from './split-collapsible-props.svelte'
export { useCollapsibleContext, type UseCollapsibleContext } from './use-collapsible-context'
export { useCollapsible, type UseCollapsibleProps, type UseCollapsibleReturn } from './use-collapsible.svelte'

export * as Collapsible from './collapsible'
