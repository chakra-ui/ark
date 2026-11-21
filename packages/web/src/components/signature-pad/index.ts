import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/signature-pad'
import type { ActionMethods, RootElement } from '../../utils/define.js'

export type { Api as SignaturePadApi, DataUrlType, DrawingOptions } from '@zag-js/signature-pad'
export interface SignaturePadElement
  extends ActionMethods<Api, 'clear'>, RootElement<Api, Props>, Pick<Props, 'ids' | 'translations' | 'drawing'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-signature-pad': SignaturePadElement
  }
}

export type SignaturePadEventMap = CallbackEvents<Props>
