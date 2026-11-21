import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/carousel'
import type { ActionMethods, RootElement, StateProperties } from '../../utils/define.js'

export type { Api as CarouselApi } from '@zag-js/carousel'
export interface CarouselElement
  extends
    ActionMethods<Api, 'scrollNext' | 'scrollPrevious'>,
    RootElement<Api, Props>,
    Pick<Props, 'ids' | 'translations'>,
    StateProperties<Props, 'page'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-carousel': CarouselElement
  }
}

export type CarouselEventMap = CallbackEvents<Props>
