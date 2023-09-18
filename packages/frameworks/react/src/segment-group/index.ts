import { Segment, type SegmentProps } from './segment'
import { useSegmentContext, type SegmentContext } from './segment-context'
import { SegmentControl, type SegmentControlProps } from './segment-control'
import { SegmentGroup as SegmentGroupRoot, type SegmentGroupProps } from './segment-group'
import { useSegmentGroupContext, type SegmentGroupContext } from './segment-group-context'
import { SegmentGroupIndicator, type SegmentGroupIndicatorProps } from './segment-group-indicator'
import { SegmentGroupLabel, type SegmentGroupLabelProps } from './segment-group-label'
import { SegmentLabel, type SegmentLabelProps } from './segment-label'

const SegmentGroup = Object.assign(SegmentGroupRoot, {
  Root: SegmentGroupRoot,
  Label: SegmentGroupLabel,
  Indicator: SegmentGroupIndicator,
  Segment: Segment,
  SegmentLabel: SegmentLabel,
  SegmentControl: SegmentControl,
})

export {
  Segment,
  SegmentControl,
  SegmentGroup,
  SegmentGroupIndicator,
  SegmentGroupLabel,
  SegmentLabel,
  useSegmentContext,
  useSegmentGroupContext,
}

export type {
  SegmentContext,
  SegmentControlProps,
  SegmentGroupContext,
  SegmentGroupIndicatorProps,
  SegmentGroupLabelProps,
  SegmentGroupProps,
  SegmentLabelProps,
  SegmentProps,
}
