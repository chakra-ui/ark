import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/editable'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'
import type {
  EditableArea,
  EditableCancelTrigger,
  EditableControl,
  EditableEditTrigger,
  EditableInput,
  EditableLabel,
  EditablePreview,
  EditableSubmitTrigger,
} from './parts.js'

export type { Api as EditableApi } from '@zag-js/editable'
export interface EditableElement
  extends
    RootElement<Api, Props>,
    FunctionProperties<Props>,
    Pick<Props, 'ids' | 'translations'>,
    StateProperties<Props, 'value'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-editable': EditableElement
    'ark-editable-input': InstanceType<typeof EditableInput>
    'ark-editable-preview': InstanceType<typeof EditablePreview>
    'ark-editable-edit-trigger': InstanceType<typeof EditableEditTrigger>
    'ark-editable-submit-trigger': InstanceType<typeof EditableSubmitTrigger>
    'ark-editable-cancel-trigger': InstanceType<typeof EditableCancelTrigger>
    'ark-editable-label': InstanceType<typeof EditableLabel>
    'ark-editable-area': InstanceType<typeof EditableArea>
    'ark-editable-control': InstanceType<typeof EditableControl>
  }
}

export type EditableEventMap = CallbackEvents<Props>
