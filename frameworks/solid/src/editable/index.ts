import type { ValueChangeDetails as EditableValueChangeDetails } from '@zag-js/editable'
import { EditableArea, type EditableAreaProps } from './editable-area'
import { EditableCancelTrigger, type EditableCancelTriggerProps } from './editable-cancel-trigger'
import { EditableContext, type EditableContextProps } from './editable-context'
import { EditableControl, type EditableControlProps } from './editable-control'
import { EditableEditTrigger, type EditableEditTriggerProps } from './editable-edit-trigger'
import { EditableInput, type EditableInputProps } from './editable-input'
import { EditableLabel, type EditableLabelProps } from './editable-label'
import { EditablePreview, type EditablePreviewProps } from './editable-preview'
import { EditableRoot, type EditableRootProps } from './editable-root'
import { EditableSubmitTrigger, type EditableSubmitTriggerProps } from './editable-submit-trigger'
import { useEditableContext, type UseEditableContext } from './use-editable-context'

export * as Editable from './editable'

export {
  EditableArea,
  EditableCancelTrigger,
  EditableContext,
  EditableControl,
  EditableEditTrigger,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableRoot,
  EditableSubmitTrigger,
  useEditableContext,
}

export type {
  EditableAreaProps,
  EditableCancelTriggerProps,
  EditableContextProps,
  EditableControlProps,
  EditableEditTriggerProps,
  EditableInputProps,
  EditableLabelProps,
  EditablePreviewProps,
  EditableRootProps,
  EditableSubmitTriggerProps,
  EditableValueChangeDetails,
  UseEditableContext,
}
