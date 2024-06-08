export type {
  FocusChangeDetails as TabsFocusChangeDetails,
  ValueChangeDetails as TabsValueChangeDetails,
} from '@zag-js/tabs'
export { default as TabContent, type TabContentProps } from './tab-content.vue'
export { default as TabIndicator, type TabIndicatorProps } from './tab-indicator.vue'
export { default as TabList, type TabListProps } from './tab-list.vue'
export { default as TabTrigger, type TabTriggerProps } from './tab-trigger.vue'
export { default as TabsContext, type TabsContextProps } from './tabs-context.vue'
export {
  default as TabsRootProvider,
  type TabsRootProviderProps,
} from './tabs-root-provider.vue'
export { default as TabsRoot, type TabsRootEmits, type TabsRootProps } from './tabs-root.vue'
export { useTabs, type UseTabsProps, type UseTabsReturn } from './use-tabs'
export { useTabsContext, type UseTabsContext } from './use-tabs-context'

export * as Tabs from './tabs'
