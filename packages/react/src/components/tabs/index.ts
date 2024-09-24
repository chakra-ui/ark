export type {
  FocusChangeDetails as TabsFocusChangeDetails,
  ValueChangeDetails as TabsValueChangeDetails,
} from '@zag-js/tabs'
export {
  TabContent,
  type TabContentBaseProps,
  type TabContentProps,
} from './tab-content'
export {
  TabIndicator,
  type TabIndicatorBaseProps,
  type TabIndicatorProps,
} from './tab-indicator'
export {
  TabList,
  type TabListBaseProps,
  type TabListProps,
} from './tab-list'
export {
  TabTrigger,
  type TabTriggerBaseProps,
  type TabTriggerProps,
} from './tab-trigger'
export {
  TabsContext,
  type TabsContextProps,
} from './tabs-context'
export {
  TabsRoot,
  type TabsRootBaseProps,
  type TabsRootProps,
} from './tabs-root'
export {
  TabsRootProvider,
  type TabsRootProviderBaseProps,
  type TabsRootProviderProps,
} from './tabs-root-provider'
export { tabsAnatomy } from './tabs.anatomy'
export { useTabs, type UseTabsProps, type UseTabsReturn } from './use-tabs'
export { useTabsContext, type UseTabsContext } from './use-tabs-context'

export * as Tabs from './tabs'
