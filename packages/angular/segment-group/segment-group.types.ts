import type { Machine as ZagMachine } from '@zag-js/core'
import type { Machine } from '@zag-js/radio-group'

export type {
  Api as SegmentGroupApi,
  ElementIds as SegmentGroupElementIds,
  ItemProps as SegmentGroupItemProps,
  ItemState as SegmentGroupItemState,
  Machine as SegmentGroupMachine,
  Props as SegmentGroupMachineProps,
  Service as SegmentGroupService,
  ValueChangeDetails as SegmentGroupValueChangeDetails,
} from '@zag-js/radio-group'

export type SegmentGroupSchema = Machine extends ZagMachine<infer S> ? S : never
