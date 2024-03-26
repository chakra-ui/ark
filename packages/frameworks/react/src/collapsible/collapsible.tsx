import type { OpenChangeDetails } from '@zag-js/collapsible'
import {
  CollapsibleContent as Content,
  type CollapsibleContentProps as ContentProps,
} from './collapsible-content'
import {
  CollapsibleContext as Context,
  type CollapsibleContextProps as ContextProps,
} from './collapsible-context'
import { CollapsibleRoot as Root, type CollapsibleRootProps as RootProps } from './collapsible-root'
import {
  CollapsibleTrigger as Trigger,
  type CollapsibleTriggerProps as TriggerProps,
} from './collapsible-trigger'

export { Content, Context, Root, Trigger }
export type { ContentProps, ContextProps, OpenChangeDetails, RootProps, TriggerProps }
