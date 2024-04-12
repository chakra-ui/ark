import type { ValueChangeDetails } from '@zag-js/editable'
import { EditableArea as Area, type EditableAreaProps as AreaProps } from './editable-area'
import {
  EditableCancelTrigger as CancelTrigger,
  type EditableCancelTriggerProps as CancelTriggerProps,
} from './editable-cancel-trigger'
import { EditableContext as Context, type EditableContextProps } from './editable-context'
import {
  EditableControl as Control,
  type EditableControlProps as ControlProps,
} from './editable-control'
import {
  EditableEditTrigger as EditTrigger,
  type EditableEditTriggerProps as EditTriggerProps,
} from './editable-edit-trigger'
import { EditableInput as Input, type EditableInputProps as InputProps } from './editable-input'
import { EditableLabel as Label, type EditableLabelProps as LabelProps } from './editable-label'
import {
  EditablePreview as Preview,
  type EditablePreviewProps as PreviewProps,
} from './editable-preview'
import { EditableRoot as Root, type EditableRootProps as RootProps } from './editable-root'
import {
  EditableSubmitTrigger as SubmitTrigger,
  type EditableSubmitTriggerProps as SubmitTriggerProps,
} from './editable-submit-trigger'

export {
  Area,
  CancelTrigger,
  Context,
  Control,
  EditTrigger,
  Input,
  Label,
  Preview,
  Root,
  SubmitTrigger,
}
export type {
  AreaProps,
  CancelTriggerProps,
  ControlProps,
  EditTriggerProps,
  EditableContextProps,
  InputProps,
  LabelProps,
  PreviewProps,
  RootProps,
  SubmitTriggerProps,
  ValueChangeDetails,
}
