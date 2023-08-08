import { NumberInput as NumberInputRoot, type NumberInputProps } from './number-input'
import { useNumberInputContext } from './number-input-context'
import { NumberInputControl, type NumberInputControlProps } from './number-input-control'
import {
  NumberInputDecrementTrigger,
  type NumberInputDecrementTriggerProps,
} from './number-input-decrement-trigger'
import { NumberInputField, type NumberInputFieldProps } from './number-input-field'
import {
  NumberInputIncrementTrigger,
  type NumberInputIncrementTriggerProps,
} from './number-input-increment-trigger'
import { NumberInputLabel, type NumberInputLabelProps } from './number-input-label'
import { NumberInputScrubber, type NumberInputScrubberProps } from './number-input-scrubber'
import { numberInputAnatomy } from './number-input.anatomy'

const NumberInput = Object.assign(NumberInputRoot, {
  Root: NumberInputRoot,
  Control: NumberInputControl,
  DecrementTrigger: NumberInputDecrementTrigger,
  Field: NumberInputField,
  IncrementTrigger: NumberInputIncrementTrigger,
  Label: NumberInputLabel,
  Scrubber: NumberInputScrubber,
})

export {
  NumberInput,
  NumberInputControl,
  NumberInputDecrementTrigger,
  NumberInputField,
  NumberInputIncrementTrigger,
  NumberInputLabel,
  NumberInputScrubber,
  numberInputAnatomy,
  useNumberInputContext,
}

export type {
  NumberInputControlProps,
  NumberInputDecrementTriggerProps,
  NumberInputFieldProps,
  NumberInputIncrementTriggerProps,
  NumberInputLabelProps,
  NumberInputProps,
  NumberInputScrubberProps,
}
