import type { ValueChangeDetails as SegmentGroupValueChangeDetails } from '@zag-js/radio-group'
import { SegmentGroupContext, type SegmentGroupContextProps } from './segment-group-context'
import { SegmentGroupIndicator, type SegmentGroupIndicatorProps } from './segment-group-indicator'
import { SegmentGroupItem, type SegmentGroupItemProps } from './segment-group-item'
import {
  SegmentGroupItemContext,
  type SegmentGroupItemContextProps,
} from './segment-group-item-context'
import {
  SegmentGroupItemControl,
  type SegmentGroupItemControlProps,
} from './segment-group-item-control'
import { SegmentGroupItemText, type SegmentGroupItemTextProps } from './segment-group-item-text'
import { SegmentGroupLabel, type SegmentGroupLabelProps } from './segment-group-label'
import { SegmentGroupRoot, type SegmentGroupRootProps } from './segment-group-root'
import { useSegmentGroupContext, type UseSegmentGroupContext } from './use-segment-group-context'
import {
  useSegmentGroupItemContext,
  type UseSegmentGroupItemContext,
} from './use-segment-group-item-context'

export * as SegmentGroup from './segment-group'

export {
  SegmentGroupContext,
  SegmentGroupIndicator,
  SegmentGroupItem,
  SegmentGroupItemContext,
  SegmentGroupItemControl,
  SegmentGroupItemText,
  SegmentGroupLabel,
  SegmentGroupRoot,
  useSegmentGroupContext,
  useSegmentGroupItemContext,
}

export type {
  SegmentGroupContextProps,
  SegmentGroupIndicatorProps,
  SegmentGroupItemContextProps,
  SegmentGroupItemControlProps,
  SegmentGroupItemProps,
  SegmentGroupItemTextProps,
  SegmentGroupLabelProps,
  SegmentGroupRootProps,
  SegmentGroupValueChangeDetails,
  UseSegmentGroupContext,
  UseSegmentGroupItemContext,
}
