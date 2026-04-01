export type {
  DateValue as DateInputDateValue,
  FocusChangeDetails as DateInputFocusChangeDetails,
  SelectionMode as DateInputSelectionMode,
  ValueChangeDetails as DateInputValueChangeDetails,
} from '@zag-js/date-input'
export { default as DateInputContext, type DateInputContextProps } from './date-input-context.vue'
export {
  default as DateInputControl,
  type DateInputControlBaseProps,
  type DateInputControlProps,
} from './date-input-control.vue'
export {
  default as DateInputHiddenInput,
  type DateInputHiddenInputBaseProps,
  type DateInputHiddenInputProps,
} from './date-input-hidden-input.vue'
export {
  default as DateInputLabel,
  type DateInputLabelBaseProps,
  type DateInputLabelProps,
} from './date-input-label.vue'
export {
  default as DateInputRootProvider,
  type DateInputRootProviderBaseProps,
  type DateInputRootProviderProps,
} from './date-input-root-provider.vue'
export {
  default as DateInputRoot,
  type DateInputRootBaseProps,
  type DateInputRootEmits,
  type DateInputRootProps,
} from './date-input-root.vue'
export {
  default as DateInputSegmentGroup,
  type DateInputSegmentGroupBaseProps,
  type DateInputSegmentGroupProps,
} from './date-input-segment-group.vue'
export {
  default as DateInputSegment,
  type DateInputSegmentBaseProps,
  type DateInputSegmentProps,
} from './date-input-segment.vue'
export { dateInputAnatomy } from './date-input.anatomy'
export { useDateInput, type UseDateInputProps, type UseDateInputReturn } from './use-date-input'
export { useDateInputContext, type UseDateInputContext } from './use-date-input-context'

export * as DateInput from './date-input'
