export type {
  FocusChangeDetails as TabsFocusChangeDetails,
  ValueChangeDetails as TabsValueChangeDetails,
} from '@zag-js/tabs'
export {
  default as TabContent,
  type TabContentProps,
  type TabContentBaseProps,
} from './tab-content.vue'
export {
  default as TabIndicator,
  type TabIndicatorProps,
  type TabIndicatorBaseProps,
} from './tab-indicator.vue'
export { default as TabList, type TabListProps, type TabListBaseProps } from './tab-list.vue'
export {
  default as TabTrigger,
  type TabTriggerProps,
  type TabTriggerBaseProps,
} from './tab-trigger.vue'
export { default as TabsContext, type TabsContextProps } from './tabs-context.vue'
export {
  default as TabsRootProvider,
  type TabsRootProviderProps,
  type TabsRootProviderBaseProps,
} from './tabs-root-provider.vue'
export {
  default as TabsRoot,
  type TabsRootProps,
  type TabsRootEmits,
  type TabsRootBaseProps,
} from './tabs-root.vue'
export { useTabs, type UseTabsProps, type UseTabsReturn } from './use-tabs'
export { useTabsContext, type UseTabsContext } from './use-tabs-context'
export { tabsAnatomy } from './tabs.anatomy'

export * as Tabs from './tabs'
