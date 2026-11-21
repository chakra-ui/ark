import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/clipboard'
import type { RootElement } from '../../utils/define.js'

export type { Api as ClipboardApi } from '@zag-js/clipboard'
export type ClipboardElement = RootElement<Api, Props> & Pick<Props, 'ids' | 'translations'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-clipboard': ClipboardElement
  }
}

export type ClipboardEventMap = CallbackEvents<Props>
