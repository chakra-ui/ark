import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/radio-group'
import type { RootElement, StateProperties } from '../../utils/define.js'

export type { Api as RadioGroupApi } from '@zag-js/radio-group'
export type RadioGroupElement = RootElement<Api, Props> & Pick<Props, 'ids'> & StateProperties<Props, 'value'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-radio-group': RadioGroupElement
  }
}

export type RadioGroupEventMap = CallbackEvents<Props>
