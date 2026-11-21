import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/rating-group'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type {
  RatingGroupControl,
  RatingGroupHiddenInput,
  RatingGroupItem,
  RatingGroupItemIndicator,
  RatingGroupLabel,
} from './parts.js'

export type { Api as RatingGroupApi } from '@zag-js/rating-group'
export interface RatingGroupElement
  extends RootElement<Api, Props>, Pick<Props, 'ids' | 'translations'>, StateProperties<Props, 'value'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-rating-group': RatingGroupElement
    'ark-rating-group-control': InstanceType<typeof RatingGroupControl>
    'ark-rating-group-item': InstanceType<typeof RatingGroupItem>
    'ark-rating-group-item-indicator': InstanceType<typeof RatingGroupItemIndicator>
    'ark-rating-group-hidden-input': InstanceType<typeof RatingGroupHiddenInput>
    'ark-rating-group-label': InstanceType<typeof RatingGroupLabel>
  }
}

export type RatingGroupEventMap = CallbackEvents<Props>
