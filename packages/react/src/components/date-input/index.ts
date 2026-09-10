export type {
  DateValue as DateInputDateValue,
  FocusChangeDetails as DateInputFocusChangeDetails,
  SelectionMode as DateInputSelectionMode,
  ValueChangeDetails as DateInputValueChangeDetails,
} from '@zag-js/date-input'
export { useDateInput, type UseDateInputProps, type UseDateInputReturn } from './use-date-input.ts'
export { useDateInputContext, type UseDateInputContext } from './use-date-input-context.ts'
export { DateInputContext, type DateInputContextProps } from './date-input-context.tsx'
export { DateInputLabel, type DateInputLabelBaseProps, type DateInputLabelProps } from './date-input-label.tsx'
export {
  DateInputRoot,
  type DateInputRootBaseProps,
  type DateInputRootProps,
  type DateInputRootState,
} from './date-input-root.tsx'
export {
  DateInputRootProvider,
  type DateInputRootProviderBaseProps,
  type DateInputRootProviderProps,
  type DateInputRootProviderState,
} from './date-input-root-provider.tsx'
export {
  DateInputSegment,
  type DateInputSegmentBaseProps,
  type DateInputSegmentProps,
  type DateInputSegmentState,
} from './date-input-segment.tsx'
export {
  DateInputSegmentGroup,
  type DateInputSegmentGroupBaseProps,
  type DateInputSegmentGroupProps,
  type DateInputSegmentGroupState,
} from './date-input-segment-group.tsx'
export {
  DateInputHiddenInput,
  type DateInputHiddenInputBaseProps,
  type DateInputHiddenInputProps,
} from './date-input-hidden-input.tsx'
export {
  DateInputControl,
  type DateInputControlBaseProps,
  type DateInputControlProps,
  type DateInputControlState,
} from './date-input-control.tsx'
export { DateInputSegmentContext, type DateInputSegmentContextProps } from './date-input-segment-context.tsx'
export { dateInputAnatomy } from './date-input.anatomy.ts'

export * as DateInput from './date-input.ts'
