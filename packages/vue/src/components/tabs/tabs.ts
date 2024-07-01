export type { FocusChangeDetails, ValueChangeDetails } from '@zag-js/tabs'
export {
  default as Content,
  type TabContentProps as ContentProps,
  type TabContentBaseProps as ContentBaseProps,
} from './tab-content.vue'
export {
  default as Indicator,
  type TabIndicatorProps as IndicatorProps,
  type TabIndicatorBaseProps as IndicatorBaseProps,
} from './tab-indicator.vue'
export {
  default as List,
  type TabListProps as ListProps,
  type TabListBaseProps as ListBaseProps,
} from './tab-list.vue'
export {
  default as Trigger,
  type TabTriggerProps as TriggerProps,
  type TabTriggerBaseProps as TriggerBaseProps,
} from './tab-trigger.vue'
export { default as Context, type TabsContextProps as ContextProps } from './tabs-context.vue'
export {
  default as RootProvider,
  type TabsRootProviderProps as RootProviderProps,
  type TabsRootProviderBaseProps as RootProviderBaseProps,
} from './tabs-root-provider.vue'
export {
  default as Root,
  type TabsRootEmits as RootEmits,
  type TabsRootBaseProps as RootBaseProps,
  type TabsRootProps as RootProps,
} from './tabs-root.vue'
