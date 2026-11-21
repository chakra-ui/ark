import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/carousel'
import type { RootElement } from '../../utils/define.js'

export type { Api as CarouselApi } from '@zag-js/carousel'
export type CarouselElement = RootElement<Api, Props> & Pick<Props, 'ids' | 'translations'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-carousel': CarouselElement
  }
}

export type CarouselEventMap = CallbackEvents<Props>
