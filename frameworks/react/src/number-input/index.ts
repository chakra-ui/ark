import type {
  FocusChangeDetails as NumberInputFocusChangeDetails,
  ValueChangeDetails as NumberInputValueChangeDetails,
  ValueInvalidDetails as NumberInputValueInvalidDetails,
} from '@zag-js/number-input'
import { NumberInputContext, type NumberInputContextProps } from './number-input-context'
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
import { useNumberInputContext, type UseNumberInputContext } from './use-number-input-context'

export * as NumberInput from './number-input'

export {
  NumberInputContext,
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
  NumberInputContextProps,
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
  UseNumberInputContext,
}
