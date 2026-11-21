import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/pin-input'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'

export type { Api as PinInputApi } from '@zag-js/pin-input'
export interface PinInputElement
  extends
    RootElement<Api, Props>,
    FunctionProperties<Props>,
    Pick<Props, 'ids' | 'translations'>,
    StateProperties<Props, 'value'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-pin-input': PinInputElement
  }
}

export type PinInputEventMap = CallbackEvents<Props>
