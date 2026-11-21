import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/rating-group'
import type { RootElement, StateProperties } from '../../utils/define.js'

export type { Api as RatingGroupApi } from '@zag-js/rating-group'
export interface RatingGroupElement
  extends RootElement<Api, Props>, Pick<Props, 'ids' | 'translations'>, StateProperties<Props, 'value'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-rating-group': RatingGroupElement
  }
}

export type RatingGroupEventMap = CallbackEvents<Props>
