import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/angle-slider'
import type { RootElement, StateProperties } from '../../utils/define.js'

export type { Api as AngleSliderApi } from '@zag-js/angle-slider'
export type AngleSliderElement = RootElement<Api, Props> & Pick<Props, 'ids'> & StateProperties<Props, 'value'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-angle-slider': AngleSliderElement
  }
}

export type AngleSliderEventMap = CallbackEvents<Props>
