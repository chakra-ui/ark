import { PinInput as PinInputRoot, type PinInputProps } from './pin-input'
import { usePinInputContext } from './pin-input-context'
import { PinInputControl, type PinInputControlProps } from './pin-input-control'
import { PinInputField, type PinInputFieldProps } from './pin-input-field'
import { PinInputLabel, type PinInputLabelProps } from './pin-input-label'
import { pinInputAnatomy } from './pin-input.anatomy'

const PinInput = Object.assign(PinInputRoot, {
  Root: PinInputRoot,
  Control: PinInputControl,
  Field: PinInputField,
  Label: PinInputLabel,
})

export {
  PinInput,
  PinInputControl,
  PinInputField,
  PinInputLabel,
  pinInputAnatomy,
  usePinInputContext,
}

export type { PinInputControlProps, PinInputFieldProps, PinInputLabelProps, PinInputProps }
