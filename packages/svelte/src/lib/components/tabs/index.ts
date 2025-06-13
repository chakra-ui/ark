export type {
  FocusChangeDetails as TabsFocusChangeDetails,
  ValueChangeDetails as TabsValueChangeDetails,
} from '@zag-js/tabs'
export { default as TabsContent, type TabsContentBaseProps, type TabsContentProps } from './tabs-content.svelte'
export { default as TabsContext, type TabsContextProps } from './tabs-context.svelte'
export { default as TabsIndicator, type TabsIndicatorBaseProps, type TabsIndicatorProps } from './tabs-indicator.svelte'
export { default as TabsList, type TabsListBaseProps, type TabsListProps } from './tabs-list.svelte'
export {
  default as TabsRootProvider,
  type TabsRootProviderBaseProps,
  type TabsRootProviderProps,
} from './tabs-root-provider.svelte'
export { default as TabsRoot, type TabsRootBaseProps, type TabsRootProps } from './tabs-root.svelte'
export { default as TabsTrigger, type TabsTriggerBaseProps, type TabsTriggerProps } from './tabs-trigger.svelte'
export { tabsAnatomy } from './tabs.anatomy'
export { useTabsContext, type UseTabsContext } from './use-tabs-context'
export { useTabs, type UseTabsProps, type UseTabsReturn } from './use-tabs.svelte'

export * as Tabs from './tabs'
