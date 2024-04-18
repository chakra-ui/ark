import CollapsibleContent from './collapsible-content.vue'
import CollapsibleContext from './collapsible-context.vue'
import CollapsibleRoot, {
  type CollapsibleRootEmits,
  type CollapsibleRootProps,
} from './collapsible-root.vue'
import CollapsibleTrigger from './collapsible-trigger.vue'
import { type UseCollapsibleContext, useCollapsibleContext } from './use-collapsible-context'

// export * as Collapsible from './collapsible'

export {
  CollapsibleContext,
  CollapsibleTrigger,
  CollapsibleContent,
  CollapsibleRoot,
  useCollapsibleContext,
}
export type { CollapsibleRootEmits, CollapsibleRootProps, UseCollapsibleContext }
