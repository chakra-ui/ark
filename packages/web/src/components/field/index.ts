import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/field'
import type { CallbackEvents } from '../../utils/events.js'
import type { RootElement } from '../../utils/define.js'
import type {
  FieldItem,
  FieldLabel,
  FieldInput,
  FieldSelect,
  FieldTextarea,
  FieldHelperText,
  FieldErrorText,
  FieldIndicator,
} from './parts.js'

export type { Api as FieldApi } from '@zag-js/field'
export interface FieldElement extends RootElement<Api, Props>, Pick<Props, 'ids' | 'errors' | 'validate'> {}
export type FieldEventMap = CallbackEvents<Props>

declare global {
  interface HTMLElementTagNameMap {
    'ark-field': FieldElement
    'ark-field-item': InstanceType<typeof FieldItem>
    'ark-field-label': InstanceType<typeof FieldLabel>
    'ark-field-input': InstanceType<typeof FieldInput>
    'ark-field-select': InstanceType<typeof FieldSelect>
    'ark-field-textarea': InstanceType<typeof FieldTextarea>
    'ark-field-helper-text': InstanceType<typeof FieldHelperText>
    'ark-field-error-text': InstanceType<typeof FieldErrorText>
    'ark-field-indicator': InstanceType<typeof FieldIndicator>
  }
}
