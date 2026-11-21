import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/fieldset'
import type { RootElement } from '../../utils/define.js'

export type { Api as FieldsetApi } from '@zag-js/fieldset'
export type FieldsetElement = RootElement<Api, Props> & Pick<Props, 'ids'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-fieldset': FieldsetElement
  }
}
