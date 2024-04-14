import type { ValueChangeDetails as SegmentGroupValueChangeDetails } from '@zag-js/radio-group'
import { type SegmentGroupContext, useSegmentGroupContext } from './segment-group-context'
import { SegmentGroupIndicator, type SegmentGroupIndicatorProps } from './segment-group-indicator'
import { SegmentGroupItem, type SegmentGroupItemProps } from './segment-group-item'
import {
  type SegmentGroupItemContext,
  useSegmentGroupItemContext,
} from './segment-group-item-context'
import {
  SegmentGroupItemControl,
  type SegmentGroupItemControlProps,
} from './segment-group-item-control'
import { SegmentGroupItemText, type SegmentGroupItemTextProps } from './segment-group-item-text'
import { SegmentGroupLabel, type SegmentGroupLabelProps } from './segment-group-label'
import { SegmentGroupRoot, type SegmentGroupRootProps } from './segment-group-root'

export * as SegmentGroup from './segment-group'

export {
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemControl,
  SegmentGroupItemText,
  SegmentGroupLabel,
  SegmentGroupRoot,
  useSegmentGroupContext,
  useSegmentGroupItemContext,
}

export type {
  SegmentGroupContext,
  SegmentGroupIndicatorProps,
  SegmentGroupItemContext,
  SegmentGroupItemControlProps,
  SegmentGroupItemProps,
  SegmentGroupItemTextProps,
  SegmentGroupLabelProps,
  SegmentGroupRootProps,
  SegmentGroupValueChangeDetails,
}
