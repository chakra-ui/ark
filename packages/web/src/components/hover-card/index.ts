import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/hover-card'
import type { RootElement } from '../../utils/define.js'

export type { Api as HoverCardApi } from '@zag-js/hover-card'
export type HoverCardElement = RootElement<Api, Props> & Pick<Props, 'ids' | 'positioning'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-hover-card': HoverCardElement
  }
}

export type HoverCardEventMap = CallbackEvents<Props>
