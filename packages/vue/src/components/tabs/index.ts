export type {
  FocusChangeDetails as TabsFocusChangeDetails,
  ValueChangeDetails as TabsValueChangeDetails,
} from '@zag-js/tabs'
export {
  default as TabContent,
  type TabContentBaseProps,
  type TabContentProps,
} from './tab-content.vue'
export {
  default as TabIndicator,
  type TabIndicatorBaseProps,
  type TabIndicatorProps,
} from './tab-indicator.vue'
export { default as TabList, type TabListBaseProps, type TabListProps } from './tab-list.vue'
export {
  default as TabTrigger,
  type TabTriggerBaseProps,
  type TabTriggerProps,
} from './tab-trigger.vue'
export { default as TabsContext, type TabsContextProps } from './tabs-context.vue'
export {
  default as TabsRootProvider,
  type TabsRootProviderBaseProps,
  type TabsRootProviderProps,
} from './tabs-root-provider.vue'
export {
  default as TabsRoot,
  type TabsRootBaseProps,
  type TabsRootEmits,
  type TabsRootProps,
} from './tabs-root.vue'
export { tabsAnatomy } from './tabs.anatomy'
export { useTabs, type UseTabsProps, type UseTabsReturn } from './use-tabs'
export { useTabsContext, type UseTabsContext } from './use-tabs-context'

export * as Tabs from './tabs'
