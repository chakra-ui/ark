export type {
  FocusChangeDetails as TabsFocusChangeDetails,
  ValueChangeDetails as TabsValueChangeDetails,
} from '@zag-js/tabs'
export {
  TabContent,
  type TabContentProps,
  type TabContentBaseProps,
} from './tab-content'
export {
  TabIndicator,
  type TabIndicatorProps,
  type TabIndicatorBaseProps,
} from './tab-indicator'
export {
  TabList,
  type TabListProps,
  type TabListBaseProps,
} from './tab-list'
export {
  TabTrigger,
  type TabTriggerProps,
  type TabTriggerBaseProps,
} from './tab-trigger'
export {
  TabsContext,
  type TabsContextProps,
} from './tabs-context'
export {
  TabsRoot,
  type TabsRootProps,
  type TabsRootBaseProps,
} from './tabs-root'
export {
  TabsRootProvider,
  type TabsRootProviderProps,
  type TabsRootProviderBaseProps,
} from './tabs-root-provider'
export { useTabs, type UseTabsProps, type UseTabsReturn } from './use-tabs'
export { useTabsContext, type UseTabsContext } from './use-tabs-context'
export { tabsAnatomy } from './tabs.anatomy'

export * as Tabs from './tabs'
