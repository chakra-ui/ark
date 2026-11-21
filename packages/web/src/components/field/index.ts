import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/field'
import type { CallbackEvents } from '../../utils/events.js'
import type { RootElement } from '../../utils/define.js'

export type { Api as FieldApi } from '@zag-js/field'
export interface FieldElement extends RootElement<Api, Props>, Pick<Props, 'ids' | 'errors' | 'validate'> {}
export type FieldEventMap = CallbackEvents<Props>

declare global {
  interface HTMLElementTagNameMap {
    'ark-field': FieldElement
  }
}
