export type {
  FocusChangeDetails as NumberInputFocusChangeDetails,
  ValueChangeDetails as NumberInputValueChangeDetails,
  ValueInvalidDetails as NumberInputValueInvalidDetails,
} from '@zag-js/number-input'
export {
  default as NumberInputContext,
  type NumberInputContextProps,
} from './number-input-context.vue'
export {
  default as NumberInputControl,
  type NumberInputControlProps,
} from './number-input-control.vue'
export {
  default as NumberInputDecrementTrigger,
  type NumberInputDecrementTriggerProps,
} from './number-input-decrement-trigger.vue'
export {
  default as NumberInputIncrementTrigger,
  type NumberInputIncrementTriggerProps,
} from './number-input-increment-trigger.vue'
export { default as NumberInputInput, type NumberInputInputProps } from './number-input-input.vue'
export { default as NumberInputLabel, type NumberInputLabelProps } from './number-input-label.vue'
export {
  default as NumberInputRootProvider,
  type NumberInputRootProviderProps,
} from './number-input-root-provider.vue'
export {
  default as NumberInputRoot,
  type NumberInputRootEmits,
  type NumberInputRootProps,
} from './number-input-root.vue'
export {
  default as NumberInputScrubber,
  type NumberInputScrubberProps,
} from './number-input-scrubber.vue'
export {
  useNumberInput,
  type UseNumberInputProps,
  type UseNumberInputReturn,
} from './use-number-input'
export { useNumberInputContext, type UseNumberInputContext } from './use-number-input-context'

export * as NumberInput from './number-input'
