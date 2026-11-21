import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/number-input'
import type { RootElement } from '../../utils/define.js'

export type { Api as NumberInputApi } from '@zag-js/number-input'
export type NumberInputElement = RootElement<Api, Props> & Pick<Props, 'ids' | 'translations'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-number-input': NumberInputElement
  }
}

export type NumberInputEventMap = CallbackEvents<Props>
