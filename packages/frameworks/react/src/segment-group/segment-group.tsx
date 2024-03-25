import type { ValueChangeDetails } from '@zag-js/radio-group'
import {
  SegmentGroupIndicator as Indicator,
  type SegmentGroupIndicatorProps as IndicatorProps,
} from './segment-group-indicator'
import {
  SegmentGroupItem as Item,
  type SegmentGroupItemProps as ItemProps,
} from './segment-group-item'
import {
  SegmentGroupItemControl as ItemControl,
  type SegmentGroupItemControlProps as ItemControlProps,
} from './segment-group-item-control'
import {
  SegmentGroupItemText as ItemText,
  type SegmentGroupItemTextProps as ItemTextProps,
} from './segment-group-item-text'
import {
  SegmentGroupLabel as Label,
  type SegmentGroupLabelProps as LabelProps,
} from './segment-group-label'
import {
  SegmentGroupRoot as Root,
  type SegmentGroupRootProps as RootProps,
} from './segment-group-root'

export { Indicator, Item, ItemControl, ItemText, Label, Root }
export type {
  IndicatorProps,
  ItemControlProps,
  ItemProps,
  ItemTextProps,
  LabelProps,
  RootProps,
  ValueChangeDetails,
}
