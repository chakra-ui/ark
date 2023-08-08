import { PinInput as PinInputRoot, type PinInputProps } from './pin-input'
import { usePinInputContext } from './pin-input-context'
import { PinInputControl, type PinInputControlProps } from './pin-input-control'
import { PinInputInput, type PinInputInputProps } from './pin-input-field'
import { PinInputLabel, type PinInputLabelProps } from './pin-input-label'
import { pinInputAnatomy } from './pin-input.anatomy'

const PinInput = Object.assign(PinInputRoot, {
  Root: PinInputRoot,
  Control: PinInputControl,
  Input: PinInputInput,
  Label: PinInputLabel,
})

export {
  PinInput,
  PinInputControl,
  PinInputInput,
  PinInputLabel,
  pinInputAnatomy,
  usePinInputContext,
}

export type { PinInputControlProps, PinInputInputProps, PinInputLabelProps, PinInputProps }
