export type {
  FocusChangeDetails as TabsFocusChangeDetails,
  ValueChangeDetails as TabsValueChangeDetails,
} from '@zag-js/tabs'
export {
  default as TabContent,
  type TabsContentBaseProps as TabContentBaseProps,
  type TabsContentProps as TabContentProps,
} from './tabs-content.svelte'
export { default as TabsContext, type TabsContextProps } from './tabs-context.svelte'
export {
  default as TabIndicator,
  type TabsIndicatorBaseProps as TabIndicatorBaseProps,
  type TabsIndicatorProps as TabIndicatorProps,
} from './tabs-indicator.svelte'
export {
  default as TabList,
  type TabsListBaseProps as TabListBaseProps,
  type TabsListProps as TabListProps,
} from './tabs-list.svelte'
export {
  default as TabsRootProvider,
  type TabsRootProviderBaseProps,
  type TabsRootProviderProps,
} from './tabs-root-provider.svelte'
export { default as TabsRoot, type TabsRootBaseProps, type TabsRootProps } from './tabs-root.svelte'
export {
  default as TabTrigger,
  type TabsTriggerBaseProps as TabTriggerBaseProps,
  type TabsTriggerProps as TabTriggerProps,
} from './tabs-trigger.svelte'
export { tabsAnatomy } from './tabs.anatomy'
export { useTabsContext, type UseTabsContext } from './use-tabs-context'
export { useTabs, type UseTabsProps, type UseTabsReturn } from './use-tabs.svelte'

export * as Tabs from './tabs'
