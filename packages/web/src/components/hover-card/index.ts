import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/hover-card'
import type { RootElement, StateProperties } from '../../utils/define.js'

export type { Api as HoverCardApi } from '@zag-js/hover-card'
export type HoverCardElement = RootElement<Api, Props> &
  Pick<Props, 'ids' | 'positioning'> &
  StateProperties<Props, 'open'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-hover-card': HoverCardElement
  }
}

export type HoverCardEventMap = CallbackEvents<Props>
