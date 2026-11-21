import './root.js'
import './parts.js'
import type { RootElement } from '../../utils/define.js'
import type { FieldsetApi } from './shared.js'

export type { FieldsetApi } from './shared.js'
export type FieldsetElement = RootElement<FieldsetApi>

declare global {
  interface HTMLElementTagNameMap {
    'ark-fieldset': FieldsetElement
  }
}
