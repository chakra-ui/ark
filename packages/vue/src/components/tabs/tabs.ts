export type { FocusChangeDetails, ValueChangeDetails } from '@zag-js/tabs'
export {
  default as Content,
  type TabContentBaseProps as ContentBaseProps,
  type TabContentProps as ContentProps,
} from './tab-content.vue'
export {
  default as Indicator,
  type TabIndicatorBaseProps as IndicatorBaseProps,
  type TabIndicatorProps as IndicatorProps,
} from './tab-indicator.vue'
export {
  default as List,
  type TabListBaseProps as ListBaseProps,
  type TabListProps as ListProps,
} from './tab-list.vue'
export {
  default as Trigger,
  type TabTriggerBaseProps as TriggerBaseProps,
  type TabTriggerProps as TriggerProps,
} from './tab-trigger.vue'
export { default as Context, type TabsContextProps as ContextProps } from './tabs-context.vue'
export {
  default as RootProvider,
  type TabsRootProviderBaseProps as RootProviderBaseProps,
  type TabsRootProviderProps as RootProviderProps,
} from './tabs-root-provider.vue'
export {
  default as Root,
  type TabsRootBaseProps as RootBaseProps,
  type TabsRootEmits as RootEmits,
  type TabsRootProps as RootProps,
} from './tabs-root.vue'
