import type {
  FocusChangeDetails,
  ValueChangeDetails,
  ValueInvalidDetails,
} from '@zag-js/number-input'
import {
  NumberInputContext as Context,
  type NumberInputContextProps as ContextProps,
} from './number-input-context'
import {
  NumberInputControl as Control,
  type NumberInputControlProps as ControlProps,
} from './number-input-control'
import {
  NumberInputDecrementTrigger as DecrementTrigger,
  type NumberInputDecrementTriggerProps as DecrementTriggerProps,
} from './number-input-decrement-trigger'
import {
  NumberInputIncrementTrigger as IncrementTrigger,
  type NumberInputIncrementTriggerProps as IncrementTriggerProps,
} from './number-input-increment-trigger'
import {
  NumberInputInput as Input,
  type NumberInputInputProps as InputProps,
} from './number-input-input'
import {
  NumberInputLabel as Label,
  type NumberInputLabelProps as LabelProps,
} from './number-input-label'
import {
  NumberInputRoot as Root,
  type NumberInputRootProps as RootProps,
} from './number-input-root'
import {
  NumberInputScrubber as Scrubber,
  type NumberInputScrubberProps as ScrubberProps,
} from './number-input-scrubber'

export { Context, Control, DecrementTrigger, IncrementTrigger, Input, Label, Root, Scrubber }
export type {
  ContextProps,
  ControlProps,
  DecrementTriggerProps,
  FocusChangeDetails,
  IncrementTriggerProps,
  InputProps,
  LabelProps,
  RootProps,
  ScrubberProps,
  ValueChangeDetails,
  ValueInvalidDetails,
}
