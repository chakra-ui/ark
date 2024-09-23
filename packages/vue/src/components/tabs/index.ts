export type {
  FocusChangeDetails as TabsFocusChangeDetails,
  ValueChangeDetails as TabsValueChangeDetails,
} from '@zag-js/tabs'
export {
  type TabContentBaseProps,
  type TabContentProps,
} from './tab-content.vue'
export {
  type TabIndicatorBaseProps,
  type TabIndicatorProps,
} from './tab-indicator.vue'
export { type TabListBaseProps, type TabListProps } from './tab-list.vue'
export {
  type TabTriggerBaseProps,
  type TabTriggerProps,
} from './tab-trigger.vue'
export { type TabsContextProps } from './tabs-context.vue'
export {
  type TabsRootProviderBaseProps,
  type TabsRootProviderProps,
} from './tabs-root-provider.vue'
export {
  type TabsRootBaseProps,
  type TabsRootEmits,
  type TabsRootProps,
} from './tabs-root.vue'
export { tabsAnatomy } from './tabs.anatomy'
export { useTabs, type UseTabsProps, type UseTabsReturn } from './use-tabs'
export { useTabsContext, type UseTabsContext } from './use-tabs-context'

export * as Tabs from './tabs'
