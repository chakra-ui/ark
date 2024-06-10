export type {
  HighlightChangeDetails as SelectHighlightChangeDetails,
  OpenChangeDetails as SelectOpenChangeDetails,
  ValueChangeDetails as SelectValueChangeDetails,
} from '@zag-js/select'
export type { CollectionItem as SelectCollectionItem } from '../../types'
export {
  default as SelectClearTrigger,
  type SelectClearTriggerProps,
} from './select-clear-trigger.vue'
export { default as SelectContent, type SelectContentProps } from './select-content.vue'
export { default as SelectContext, type SelectContextProps } from './select-context.vue'
export { default as SelectControl, type SelectControlProps } from './select-control.vue'
export {
  default as SelectHiddenSelect,
  type SelectHiddenSelectProps,
} from './select-hidden-select.vue'
export { default as SelectIndicator, type SelectIndicatorProps } from './select-indicator.vue'
export {
  default as SelectItemContext,
  type SelectItemContextProps,
} from './select-item-context.vue'
export {
  default as SelectItemGroupLabel,
  type SelectItemGroupLabelProps,
} from './select-item-group-label.vue'
export { default as SelectList, type SelectListProps } from './select-list.vue'
export { default as SelectItemGroup, type SelectItemGroupProps } from './select-item-group.vue'
export {
  default as SelectItemIndicator,
  type SelectItemIndicatorProps,
} from './select-item-indicator.vue'
export { default as SelectItemText, type SelectItemTextProps } from './select-item-text.vue'
export { default as SelectItem, type SelectItemProps } from './select-item.vue'
export { default as SelectLabel, type SelectLabelProps } from './select-label.vue'
export { default as SelectPositioner, type SelectPositionerProps } from './select-positioner.vue'
export {
  default as SelectRootProvider,
  type SelectRootProviderProps,
} from './select-root-provider.vue'
export {
  default as SelectRoot,
  type SelectRootEmits,
  type SelectRootProps,
} from './select-root.vue'
export { default as SelectTrigger, type SelectTriggerProps } from './select-trigger.vue'
export { default as SelectValueText, type SelectValueTextProps } from './select-value-text.vue'
export { useSelect, type UseSelectProps, type UseSelectReturn } from './use-select'
export { useSelectContext, type UseSelectContext } from './use-select-context'
export { useSelectItemContext, type UseSelectItemContext } from './use-select-item-context'

export * as Select from './select'
