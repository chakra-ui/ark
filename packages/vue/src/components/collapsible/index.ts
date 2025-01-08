export type { OpenChangeDetails as CollapsibleOpenChangeDetails } from '@zag-js/collapsible'
export {
  default as CollapsibleContent,
  type CollapsibleContentProps,
  type CollapsibleContentBaseProps,
} from './collapsible-content.vue'
export {
  default as CollapsibleContext,
  type CollapsibleContextProps,
} from './collapsible-context.vue'
export {
  default as CollapsibleRootProvider,
  type CollapsibleRootProviderProps,
  type CollapsibleRootProviderBaseProps,
} from './collapsible-root-provider.vue'
export {
  default as CollapsibleRoot,
  type CollapsibleRootEmits,
  type CollapsibleRootBaseProps,
  type CollapsibleRootProps,
} from './collapsible-root.vue'
export {
  default as CollapsibleTrigger,
  type CollapsibleTriggerProps,
  type CollapsibleTriggerBaseProps,
} from './collapsible-trigger.vue'
export {
  useCollapsible,
  type UseCollapsibleProps,
  type UseCollapsibleReturn,
} from './use-collapsible'
export { useCollapsibleContext, type UseCollapsibleContext } from './use-collapsible-context'
export { collapsibleAnatomy } from './collapsible.anatomy'

export * as Collapsible from './collapsible'
