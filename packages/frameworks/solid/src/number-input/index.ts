import type {
  FocusChangeDetails as NumberInputFocusChangeDetails,
  ValueChangeDetails as NumberInputValueChangeDetails,
  ValueInvalidDetails as NumberInputValueInvalidDetails,
} from '@zag-js/number-input'
import { useNumberInputContext, type NumberInputContext } from './number-input-context'
import { NumberInputControl, type NumberInputControlProps } from './number-input-control'
import {
  NumberInputDecrementTrigger,
  type NumberInputDecrementTriggerProps,
} from './number-input-decrement-trigger'
import {
  NumberInputIncrementTrigger,
  type NumberInputIncrementTriggerProps,
} from './number-input-increment-trigger'
import { NumberInputInput, type NumberInputInputProps } from './number-input-input'
import { NumberInputLabel, type NumberInputLabelProps } from './number-input-label'
import { NumberInputRoot, type NumberInputRootProps } from './number-input-root'
import { NumberInputScrubber, type NumberInputScrubberProps } from './number-input-scrubber'

export const NumberInput = {
  Root: NumberInputRoot,
  Control: NumberInputControl,
  DecrementTrigger: NumberInputDecrementTrigger,
  Input: NumberInputInput,
  IncrementTrigger: NumberInputIncrementTrigger,
  Label: NumberInputLabel,
  Scrubber: NumberInputScrubber,
}

export {
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputIncrementTrigger,
  NumberInputInput,
  NumberInputLabel,
  NumberInputRoot,
  NumberInputScrubber,
  useNumberInputContext,
}

export type {
  NumberInputContext,
  NumberInputControlProps,
  NumberInputDecrementTriggerProps,
  NumberInputFocusChangeDetails,
  NumberInputIncrementTriggerProps,
  NumberInputInputProps,
  NumberInputLabelProps,
  NumberInputRootProps,
  NumberInputScrubberProps,
  NumberInputValueChangeDetails,
  NumberInputValueInvalidDetails,
}
