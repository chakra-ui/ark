import type {
  FocusChangeDetails as TabsFocusChangeDetails,
  ValueChangeDetails as TabsValueChangeDetails,
} from '@zag-js/tabs'
import { TabContent, type TabContentProps } from './tab-content'
import { TabIndicator, type TabIndicatorProps } from './tab-indicator'
import { TabList, type TabListProps } from './tab-list'
import { TabTrigger, type TabTriggerProps } from './tab-trigger'
import { TabsContext, type TabsContextProps } from './tabs-context'
import { TabsRoot, type TabsRootProps } from './tabs-root'
import { useTabsContext, type UseTabsContext } from './use-tabs-context'

export * as Tabs from './tabs'

export { TabContent, TabIndicator, TabList, TabTrigger, TabsContext, TabsRoot, useTabsContext }

export type {
  TabContentProps,
  TabIndicatorProps,
  TabListProps,
  TabTriggerProps,
  TabsContextProps,
  TabsFocusChangeDetails,
  TabsRootProps,
  TabsValueChangeDetails,
  UseTabsContext,
}
