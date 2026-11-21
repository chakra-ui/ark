import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/dialog'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type { FunctionProperties } from '../../utils/events.js'

export type { Api as DialogApi } from '@zag-js/dialog'
export type DialogElement = RootElement<Api, Props> &
  FunctionProperties<Props> &
  Pick<Props, 'ids'> &
  StateProperties<Props, 'open'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-dialog': DialogElement
  }
}

export type DialogEventMap = CallbackEvents<Props>
