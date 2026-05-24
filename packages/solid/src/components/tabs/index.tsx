export type {
  FocusChangeDetails as TabsFocusChangeDetails,
  ValueChangeDetails as TabsValueChangeDetails,
} from '@zag-js/tabs'
export { TabContent, type TabContentBaseProps, type TabContentProps } from './tab-content.tsx'
export { TabIndicator, type TabIndicatorBaseProps, type TabIndicatorProps } from './tab-indicator.tsx'
export { TabList, type TabListBaseProps, type TabListProps } from './tab-list.tsx'
export { TabTrigger, type TabTriggerBaseProps, type TabTriggerProps } from './tab-trigger.tsx'
export { TabsContext, type TabsContextProps } from './tabs-context.tsx'
export { TabsRoot, type TabsRootBaseProps, type TabsRootProps } from './tabs-root.tsx'
export { TabsRootProvider, type TabsRootProviderBaseProps, type TabsRootProviderProps } from './tabs-root-provider.tsx'
export { tabsAnatomy } from './tabs.anatomy.ts'
export { useTabs, type UseTabsProps, type UseTabsReturn } from './use-tabs.ts'
export { useTabsContext, type UseTabsContext } from './use-tabs-context.ts'

export * as Tabs from './tabs.ts'
