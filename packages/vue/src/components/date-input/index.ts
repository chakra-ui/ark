export type {
  DateValue as DateInputDateValue,
  FocusChangeDetails as DateInputFocusChangeDetails,
  SelectionMode as DateInputSelectionMode,
  ValueChangeDetails as DateInputValueChangeDetails,
} from '@zag-js/date-input'
export { default as DateInputContext, type DateInputContextProps } from './date-input-context.vue'
export { default as DateInputSegmentContext, type DateInputSegmentContextProps } from './date-input-segment-context.vue'
export {
  default as DateInputControl,
  type DateInputControlBaseProps,
  type DateInputControlProps,
  type DateInputControlState,
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
  type DateInputRootProviderState,
} from './date-input-root-provider.vue'
export {
  default as DateInputRoot,
  type DateInputRootBaseProps,
  type DateInputRootEmits,
  type DateInputRootProps,
  type DateInputRootState,
} from './date-input-root.vue'
export {
  default as DateInputSegmentGroup,
  type DateInputSegmentGroupBaseProps,
  type DateInputSegmentGroupProps,
  type DateInputSegmentGroupState,
} from './date-input-segment-group.vue'
export {
  default as DateInputSegment,
  type DateInputSegmentBaseProps,
  type DateInputSegmentProps,
  type DateInputSegmentState,
} from './date-input-segment.vue'
export { dateInputAnatomy } from './date-input.anatomy.ts'
export { useDateInput, type UseDateInputProps, type UseDateInputReturn } from './use-date-input.ts'
export { useDateInputContext, type UseDateInputContext } from './use-date-input-context.ts'

export * as DateInput from './date-input.ts'
