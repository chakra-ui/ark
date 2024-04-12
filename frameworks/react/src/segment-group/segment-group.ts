import type { ValueChangeDetails } from '@zag-js/radio-group'
import {
  SegmentGroupContext as Context,
  type SegmentGroupContextProps as ContextProps,
} from './segment-group-context'
import {
  SegmentGroupIndicator as Indicator,
  type SegmentGroupIndicatorProps as IndicatorProps,
} from './segment-group-indicator'
import {
  SegmentGroupItem as Item,
  type SegmentGroupItemProps as ItemProps,
} from './segment-group-item'
import {
  SegmentGroupItemContext as ItemContext,
  type SegmentGroupItemContextProps as ItemContextProps,
} from './segment-group-item-context'
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

export { Context, Indicator, Item, ItemContext, ItemControl, ItemText, Label, Root }
export type {
  ContextProps,
  IndicatorProps,
  ItemContextProps,
  ItemControlProps,
  ItemProps,
  ItemTextProps,
  LabelProps,
  RootProps,
  ValueChangeDetails,
}
