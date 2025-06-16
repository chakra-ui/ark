export type {
  FocusChangeDetails as NumberInputFocusChangeDetails,
  ValueChangeDetails as NumberInputValueChangeDetails,
  ValueInvalidDetails as NumberInputValueInvalidDetails,
} from '@zag-js/number-input'
export { default as NumberInputContext, type NumberInputContextProps } from './number-input-context.svelte'
export {
  default as NumberInputControl,
  type NumberInputControlBaseProps,
  type NumberInputControlProps,
} from './number-input-control.svelte'
export {
  default as NumberInputDecrementTrigger,
  type NumberInputDecrementTriggerBaseProps,
  type NumberInputDecrementTriggerProps,
} from './number-input-decrement-trigger.svelte'
export {
  default as NumberInputIncrementTrigger,
  type NumberInputIncrementTriggerBaseProps,
  type NumberInputIncrementTriggerProps,
} from './number-input-increment-trigger.svelte'
export {
  default as NumberInputInput,
  type NumberInputInputBaseProps,
  type NumberInputInputProps,
} from './number-input-input.svelte'
export {
  default as NumberInputLabel,
  type NumberInputLabelBaseProps,
  type NumberInputLabelProps,
} from './number-input-label.svelte'
export {
  default as NumberInputRoot,
  type NumberInputRootBaseProps,
  type NumberInputRootProps,
} from './number-input-root.svelte'
export {
  default as NumberInputRootProvider,
  type NumberInputRootProviderBaseProps,
  type NumberInputRootProviderProps,
} from './number-input-root-provider.svelte'
export {
  default as NumberInputScrubber,
  type NumberInputScrubberBaseProps,
  type NumberInputScrubberProps,
} from './number-input-scrubber.svelte'
export {
  default as NumberInputValueText,
  type NumberInputValueTextBaseProps,
  type NumberInputValueTextProps,
} from './number-input-value-text.svelte'
export { numberInputAnatomy } from './number-input.anatomy'
export { NumberInputProvider, useNumberInputContext } from './use-number-input-context'
export type { UseNumberInputContext } from './use-number-input-context'
export { useNumberInput } from './use-number-input.svelte'
export type { UseNumberInputProps, UseNumberInputReturn } from './use-number-input.svelte'

export * as NumberInput from './number-input'
