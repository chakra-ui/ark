import './root.js'
import './parts.js'
import type { RootElement } from '../../utils/define.js'
import type { FieldApi } from './shared.js'

export type { FieldApi } from './shared.js'
export type FieldElement = RootElement<FieldApi>

declare global {
  interface HTMLElementTagNameMap {
    'ark-field': FieldElement
  }
}
