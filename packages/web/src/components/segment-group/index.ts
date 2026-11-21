import type { CallbackEvents } from '../../utils/events.js'
import './root.js'
import './parts.js'
import type { Api, Props } from '@zag-js/radio-group'
import type { RootElement, StateProperties } from '../../utils/define.js'
import type {
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemControl,
  SegmentGroupItemHiddenInput,
  SegmentGroupItemText,
  SegmentGroupLabel,
} from './parts.js'

export type { Api as SegmentGroupApi } from '@zag-js/radio-group'
export interface SegmentGroupElement
  extends RootElement<Api, Props>, Pick<Props, 'ids'>, StateProperties<Props, 'value'> {}

declare global {
  interface HTMLElementTagNameMap {
    'ark-segment-group': SegmentGroupElement
    'ark-segment-group-label': InstanceType<typeof SegmentGroupLabel>
    'ark-segment-group-indicator': InstanceType<typeof SegmentGroupIndicator>
    'ark-segment-group-item': InstanceType<typeof SegmentGroupItem>
    'ark-segment-group-item-text': InstanceType<typeof SegmentGroupItemText>
    'ark-segment-group-item-control': InstanceType<typeof SegmentGroupItemControl>
    'ark-segment-group-item-hidden-input': InstanceType<typeof SegmentGroupItemHiddenInput>
  }
}

export type SegmentGroupEventMap = CallbackEvents<Props>
