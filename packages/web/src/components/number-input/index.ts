import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/number-input'
import type { ActionMethods, RootElement, StateProperties } from '../../utils/define.js'

export type { Api as NumberInputApi } from '@zag-js/number-input'
export interface NumberInputElement
  extends
    ActionMethods<Api, 'increment' | 'decrement'>,
    RootElement<Api, Props>,
    Pick<Props, 'ids' | 'translations'>,
    StateProperties<Props, 'value'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-number-input': NumberInputElement
  }
}

export type NumberInputEventMap = CallbackEvents<Props>
