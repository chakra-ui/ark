export type {
  HighlightChangeDetails as ComboboxHighlightChangeDetails,
  InputValueChangeDetails as ComboboxInputValueChangeDetails,
  OpenChangeDetails as ComboboxOpenChangeDetails,
  ValueChangeDetails as ComboboxValueChangeDetails,
} from '@zag-js/combobox'
export type { CollectionItem as ComboboxCollectionItem } from '../../types'
export {
  default as ComboboxClearTrigger,
  type ComboboxClearTriggerProps,
} from './combobox-clear-trigger.vue'
export { default as ComboboxContent, type ComboboxContentProps } from './combobox-content.vue'
export { default as ComboboxContext, type ComboboxContextProps } from './combobox-context.vue'
export { default as ComboboxControl, type ComboboxControlProps } from './combobox-control.vue'
export { default as ComboboxInput, type ComboboxInputProps } from './combobox-input.vue'
export {
  default as ComboboxItemContext,
  type ComboboxItemContextProps,
} from './combobox-item-context.vue'
export {
  default as ComboboxItemGroupLabel,
  type ComboboxItemGroupLabelProps,
} from './combobox-item-group-label.vue'
export {
  default as ComboboxItemGroup,
  type ComboboxItemGroupProps,
} from './combobox-item-group.vue'
export {
  default as ComboboxItemIndicator,
  type ComboboxItemIndicatorProps,
} from './combobox-item-indicator.vue'
export { default as ComboboxItemText, type ComboboxItemTextProps } from './combobox-item-text.vue'
export { default as ComboboxItem, type ComboboxItemProps } from './combobox-item.vue'
export { default as ComboboxLabel, type ComboboxLabelProps } from './combobox-label.vue'
export {
  default as ComboboxPositioner,
  type ComboboxPositionerProps,
} from './combobox-positioner.vue'
export {
  default as ComboboxRootProvider,
  type ComboboxRootProviderProps,
} from './combobox-root-provider.vue'
export {
  default as ComboboxRoot,
  type ComboboxRootEmits,
  type ComboboxRootProps,
} from './combobox-root.vue'
export { default as ComboboxTrigger, type ComboboxTriggerProps } from './combobox-trigger.vue'
export { useCombobox, type UseComboboxProps, type UseComboboxReturn } from './use-combobox'
export { useComboboxContext, type UseComboboxContext } from './use-combobox-context'
export { useComboboxItemContext, type UseComboboxItemContext } from './use-combobox-item-context'

export * as Combobox from './combobox'
