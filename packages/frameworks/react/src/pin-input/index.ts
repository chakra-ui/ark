import type {
  ValueChangeDetails as PinInputValueChangeDetails,
  ValueInvalidDetails as PinInputValueInvalidDetails,
} from '@zag-js/pin-input'
import { PinInput as PinInputRoot, type PinInputProps } from './pin-input'
import { usePinInputContext, type PinInputContext } from './pin-input-context'
import { PinInputControl, type PinInputControlProps } from './pin-input-control'
import { PinInputInput, type PinInputInputProps } from './pin-input-input'
import { PinInputLabel, type PinInputLabelProps } from './pin-input-label'

const PinInput = Object.assign(PinInputRoot, {
  Root: PinInputRoot,
  Control: PinInputControl,
  Input: PinInputInput,
  Label: PinInputLabel,
})

export { PinInput, PinInputControl, PinInputInput, PinInputLabel, usePinInputContext }

export type {
  PinInputContext,
  PinInputControlProps,
  PinInputInputProps,
  PinInputLabelProps,
  PinInputProps,
  PinInputValueChangeDetails,
  PinInputValueInvalidDetails,
}
