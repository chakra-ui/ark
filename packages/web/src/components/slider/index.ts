import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/slider'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'

export type { Api as SliderApi } from '@zag-js/slider'
export type SliderElement = RootElement<Api, Props> &
  FunctionProperties<Props> &
  Pick<Props, 'ids'> &
  StateProperties<Props, 'value'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-slider': SliderElement
  }
}

export type SliderEventMap = CallbackEvents<Props>
