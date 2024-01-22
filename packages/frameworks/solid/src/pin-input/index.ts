import type {
  ValueChangeDetails as PinInputValueChangeDetails,
  ValueInvalidDetails as PinInputValueInvalidDetails,
} from '@zag-js/pin-input'
import { usePinInputContext, type PinInputContext } from './pin-input-context'
import { PinInputControl, type PinInputControlProps } from './pin-input-control'
import { PinInputInput, type PinInputInputProps } from './pin-input-input'
import { PinInputLabel, type PinInputLabelProps } from './pin-input-label'
import { PinInputRoot, type PinInputRootProps } from './pin-input-root'

export const PinInput = {
  Root: PinInputRoot,
  Control: PinInputControl,
  Input: PinInputInput,
  Label: PinInputLabel,
}

export { PinInputControl, PinInputInput, PinInputLabel, PinInputRoot, usePinInputContext }

export type {
  PinInputContext,
  PinInputControlProps,
  PinInputInputProps,
  PinInputLabelProps,
  PinInputRootProps,
  PinInputValueChangeDetails,
  PinInputValueInvalidDetails,
}
