export type { ValueChangeDetails as EditableValueChangeDetails } from '@zag-js/editable'
// TODO: Remove when Zag is fixed
export interface EditableEditChangeDetails {
  edit: boolean
}
export {
  type EditableAreaProps,
  type EditableAreaBaseProps,
} from './editable-area.vue'
export {
  type EditableCancelTriggerProps,
  type EditableCancelTriggerBaseProps,
} from './editable-cancel-trigger.vue'
export { type EditableContextProps } from './editable-context.vue'
export {
  type EditableControlProps,
  type EditableControlBaseProps,
} from './editable-control.vue'
export {
  type EditableEditTriggerProps,
  type EditableEditTriggerBaseProps,
} from './editable-edit-trigger.vue'
export {
  type EditableInputProps,
  type EditableInputBaseProps,
} from './editable-input.vue'
export {
  type EditableLabelProps,
  type EditableLabelBaseProps,
} from './editable-label.vue'
export {
  type EditablePreviewProps,
  type EditablePreviewBaseProps,
} from './editable-preview.vue'
export {
  type EditableRootEmits,
  type EditableRootBaseProps,
  type EditableRootProps,
} from './editable-root.vue'
export {
  type EditableSubmitTriggerProps,
  type EditableSubmitTriggerBaseProps,
} from './editable-submit-trigger.vue'
export { useEditable, type UseEditableProps, type UseEditableReturn } from './use-editable'
export { useEditableContext, type UseEditableContext } from './use-editable-context'
export {
  type EditableRootProviderProps,
  type EditableRootProviderBaseProps,
} from './editable-root-provider.vue'
export { editableAnatomy } from './editable.anatomy'

export * as Editable from './editable'
