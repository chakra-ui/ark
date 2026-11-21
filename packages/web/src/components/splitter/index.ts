import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/splitter'
import type { RootElement, StateProperties } from '../../utils/define.js'

export type { Api as SplitterApi } from '@zag-js/splitter'
export type SplitterElement = RootElement<Api, Props> & Pick<Props, 'ids'> & StateProperties<Props, 'size'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-splitter': SplitterElement
  }
}

export type SplitterEventMap = CallbackEvents<Props>
