import type { OpenChangeDetails as CollapsibleOpenChangeDetails } from '@zag-js/collapsible'
import { CollapsibleContent, type CollapsibleContentProps } from './collapsible-content'
import { CollapsibleContext, type CollapsibleContextProps } from './collapsible-context'
import { CollapsibleRoot, type CollapsibleRootProps } from './collapsible-root'
import { CollapsibleTrigger, type CollapsibleTriggerProps } from './collapsible-trigger'
import { useCollapsibleContext, type UseCollapsibleContext } from './use-collapsible-context'

export * as Collapsible from './collapsible'

export {
  CollapsibleContent,
  CollapsibleContext,
  CollapsibleRoot,
  CollapsibleTrigger,
  useCollapsibleContext,
}

export type {
  CollapsibleContentProps,
  CollapsibleContextProps,
  CollapsibleOpenChangeDetails,
  CollapsibleRootProps,
  CollapsibleTriggerProps,
  UseCollapsibleContext,
}
