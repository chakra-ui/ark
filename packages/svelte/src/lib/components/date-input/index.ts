export { parseDate } from '@internationalized/date'
export type {
  DateValue,
  FocusChangeDetails as DateInputFocusChangeDetails,
  SelectionMode as DateInputSelectionMode,
  ValueChangeDetails as DateInputValueChangeDetails,
} from '@zag-js/date-input'
export { default as DateInputContext, type DateInputContextProps } from './date-input-context.svelte'
export {
  default as DateInputControl,
  type DateInputControlBaseProps,
  type DateInputControlProps,
} from './date-input-control.svelte'
export {
  default as DateInputHiddenInput,
  type DateInputHiddenInputBaseProps,
  type DateInputHiddenInputProps,
} from './date-input-hidden-input.svelte'
export {
  default as DateInputLabel,
  type DateInputLabelBaseProps,
  type DateInputLabelProps,
} from './date-input-label.svelte'
export {
  default as DateInputRoot,
  type DateInputRootBaseProps,
  type DateInputRootProps,
} from './date-input-root.svelte'
export {
  default as DateInputRootProvider,
  type DateInputRootProviderBaseProps,
  type DateInputRootProviderProps,
} from './date-input-root-provider.svelte'
export {
  default as DateInputSegment,
  type DateInputSegmentBaseProps,
  type DateInputSegmentProps,
} from './date-input-segment.svelte'
export {
  default as DateInputSegmentGroup,
  type DateInputSegmentGroupBaseProps,
  type DateInputSegmentGroupProps,
} from './date-input-segment-group.svelte'
export { dateInputAnatomy } from './date-input.anatomy.js'
export { useDateInput, type UseDateInputProps, type UseDateInputReturn } from './use-date-input.svelte.js'
export { useDateInputContext, type UseDateInputContext } from './use-date-input-context.js'

export * as DateInput from './date-input.js'
