import type { ValueChangeDetails as SegmentGroupValueChangeDetails } from '@zag-js/radio-group'
import { SegmentGroupRoot, type SegmentGroupRootProps } from './segment-group'
import { useSegmentGroupContext, type SegmentGroupContext } from './segment-group-context'
import { SegmentGroupIndicator, type SegmentGroupIndicatorProps } from './segment-group-indicator'
import { SegmentGroupItem, type SegmentGroupItemProps } from './segment-group-item'
import {
  useSegmentGroupItemContext,
  type SegmentGroupItemContext,
} from './segment-group-item-context'
import {
  SegmentGroupItemControl,
  type SegmentGroupItemControlProps,
} from './segment-group-item-control'
import { SegmentGroupItemText, type SegmentGroupItemTextProps } from './segment-group-item-text'
import { SegmentGroupLabel, type SegmentGroupLabelProps } from './segment-group-label'

export const SegmentGroup = {
  Root: SegmentGroupRoot,
  Indicator: SegmentGroupIndicator,
  Item: SegmentGroupItem,
  ItemControl: SegmentGroupItemControl,
  ItemText: SegmentGroupItemText,
  Label: SegmentGroupLabel,
}

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
