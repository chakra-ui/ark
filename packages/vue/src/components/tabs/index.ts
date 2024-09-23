export type {
  FocusChangeDetails as TabsFocusChangeDetails,
  ValueChangeDetails as TabsValueChangeDetails,
} from '@zag-js/tabs'
export {
  type TabContentProps,
  type TabContentBaseProps,
} from './tab-content.vue'
export {
  type TabIndicatorProps,
  type TabIndicatorBaseProps,
} from './tab-indicator.vue'
export { type TabListBaseProps } from './tab-list.vue'
export {
  type TabTriggerProps,
  type TabTriggerBaseProps,
} from './tab-trigger.vue'
export { type TabsContextProps } from './tabs-context.vue'
export {
  type TabsRootProviderProps,
  type TabsRootProviderBaseProps,
} from './tabs-root-provider.vue'
export {
  type TabsRootProps,
  type TabsRootEmits,
  type TabsRootBaseProps,
} from './tabs-root.vue'
export { useTabs, type UseTabsProps, type UseTabsReturn } from './use-tabs'
export { useTabsContext, type UseTabsContext } from './use-tabs-context'
export { tabsAnatomy } from './tabs.anatomy'

export * as Tabs from './tabs'
