import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/fieldset'
import type { RootElement } from '../../utils/define.js'
import type { FieldsetLegend, FieldsetHelperText, FieldsetErrorText } from './parts.js'

export type { Api as FieldsetApi } from '@zag-js/fieldset'
export interface FieldsetElement extends RootElement<Api, Props>, Pick<Props, 'ids'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-fieldset': FieldsetElement
    'ark-fieldset-legend': InstanceType<typeof FieldsetLegend>
    'ark-fieldset-helper-text': InstanceType<typeof FieldsetHelperText>
    'ark-fieldset-error-text': InstanceType<typeof FieldsetErrorText>
  }
}
