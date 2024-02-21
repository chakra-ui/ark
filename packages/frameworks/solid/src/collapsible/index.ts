import type { OpenChangeDetails as CollapsibleOpenChangeDetails } from '@zag-js/collapsible'
import { CollapsibleContent, type CollapsibleContentProps } from './collapsible-content'
import { useCollapsibleContext, type CollapsibleContext } from './collapsible-context'
import { CollapsibleRoot, type CollapsibleRootProps } from './collapsible-root'
import { CollapsibleTrigger, type CollapsibleTriggerProps } from './collapsible-trigger'

export * as Collapsible from './collapsible'

export { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger, useCollapsibleContext }

export type {
  CollapsibleContentProps,
  CollapsibleContext,
  CollapsibleOpenChangeDetails,
  CollapsibleRootProps,
  CollapsibleTriggerProps,
}
