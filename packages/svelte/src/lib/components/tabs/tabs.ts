export type { FocusChangeDetails, ValueChangeDetails } from '@zag-js/tabs'
export {
  default as Content,
  type TabsContentBaseProps as ContentBaseProps,
  type TabsContentProps as ContentProps,
} from './tabs-content.svelte'
export { default as Context, type TabsContextProps as ContextProps } from './tabs-context.svelte'
export {
  default as Indicator,
  type TabsIndicatorBaseProps as IndicatorBaseProps,
  type TabsIndicatorProps as IndicatorProps,
} from './tabs-indicator.svelte'
export {
  default as List,
  type TabsListBaseProps as ListBaseProps,
  type TabsListProps as ListProps,
} from './tabs-list.svelte'
export {
  default as RootProvider,
  type TabsRootProviderBaseProps as RootProviderBaseProps,
  type TabsRootProviderProps as RootProviderProps,
} from './tabs-root-provider.svelte'
export {
  default as Root,
  type TabsRootBaseProps as RootBaseProps,
  type TabsRootProps as RootProps,
} from './tabs-root.svelte'
export {
  default as Trigger,
  type TabsTriggerBaseProps as TriggerBaseProps,
  type TabsTriggerProps as TriggerProps,
} from './tabs-trigger.svelte'
