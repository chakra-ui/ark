import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/radio-group'
import type { RootElement, StateProperties } from '../../utils/define.js'

export type { Api as SegmentGroupApi } from '@zag-js/radio-group'
export interface SegmentGroupElement
  extends RootElement<Api, Props>, Pick<Props, 'ids'>, StateProperties<Props, 'value'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-segment-group': SegmentGroupElement
  }
}

export type SegmentGroupEventMap = CallbackEvents<Props>
