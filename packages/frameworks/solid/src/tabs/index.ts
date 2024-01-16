import type {
  FocusChangeDetails as TabsFocusChangeDetails,
  ValueChangeDetails as TabsValueChangeDetails,
} from '@zag-js/tabs'
import { TabContent, type TabContentProps } from './tab-content'
import { TabIndicator, type TabIndicatorProps } from './tab-indicator'
import { TabList, type TabListProps } from './tab-list'
import { TabTrigger, type TabTriggerProps } from './tab-trigger'
import { Tabs as TabsRoot, type TabsProps } from './tabs'
import { useTabsContext, type TabsContext } from './tabs-context'

const Tabs = Object.assign(TabsRoot, {
  Root: TabsRoot,
  Content: TabContent,
  Indicator: TabIndicator,
  List: TabList,
  Trigger: TabTrigger,
})

export { TabContent, TabIndicator, TabList, TabTrigger, Tabs, useTabsContext }

export type {
  TabContentProps,
  TabIndicatorProps,
  TabListProps,
  TabTriggerProps,
  TabsContext,
  TabsFocusChangeDetails,
  TabsProps,
  TabsValueChangeDetails,
}
