import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/radio-group'
import type { RootElement } from '../../utils/define.js'

export type { Api as SegmentGroupApi } from '@zag-js/radio-group'
export type SegmentGroupElement = RootElement<Api, Props> & Pick<Props, 'ids'>

declare global {
  interface HTMLElementTagNameMap {
    'ark-segment-group': SegmentGroupElement
  }
}

export type SegmentGroupEventMap = CallbackEvents<Props>
