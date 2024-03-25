import type { FocusChangeDetails, ValueChangeDetails } from '@zag-js/tabs'
import { TabContent as Content, type TabContentProps } from './tab-content'
import {
  TabIndicator as Indicator,
  type TabIndicatorProps as IndicatorProps,
} from './tab-indicator'
import { TabList as List, type TabListProps as ListProps } from './tab-list'
import { TabTrigger as Trigger, type TabTriggerProps as TriggerProps } from './tab-trigger'
import { TabsRoot as Root, type TabsRootProps as RootProps } from './tabs-root'

export { Content, Indicator, List, Root, Trigger }
export type {
  FocusChangeDetails,
  IndicatorProps,
  ListProps,
  RootProps,
  TabContentProps,
  TriggerProps,
  ValueChangeDetails,
}
