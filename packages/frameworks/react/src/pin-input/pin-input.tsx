import type { ValueChangeDetails, ValueInvalidDetails } from '@zag-js/pin-input'
import {
  PinInputControl as Control,
  type PinInputControlProps as ControlProps,
} from './pin-input-control'
import { PinInputInput as Input, type PinInputInputProps as InputProps } from './pin-input-input'
import { PinInputLabel as Label, type PinInputLabelProps as LabelProps } from './pin-input-label'
import { PinInputRoot as Root, type PinInputRootProps as RootProps } from './pin-input-root'

export { Control, Input, Label, Root }
export type {
  ControlProps,
  InputProps,
  LabelProps,
  RootProps,
  ValueChangeDetails,
  ValueInvalidDetails,
}
