import { Segment, type SegmentProps } from './segment'
import { useSegmentContext } from './segment-context'
import { SegmentControl, type SegmentControlProps } from './segment-control'
import { SegmentGroup as SegmentGroupRoot, type SegmentGroupProps } from './segment-group'
import { useSegmentGroupContext } from './segment-group-context'
import { SegmentGroupLabel, type SegmentGroupLabelProps } from './segment-group-label'
import { segmentGroupAnatomy } from './segment-group.anatomy'
import { SegmentIndicator, type SegmentIndicatorProps } from './segment-indicator'
import { SegmentInput, type SegmentInputProps } from './segment-input'
import { SegmentLabel, type SegmentLabelProps } from './segment-label'

const SegmentGroup = Object.assign(SegmentGroupRoot, {
  Root: SegmentGroupRoot,
  Label: SegmentGroupLabel,
  Segment: Segment,
  SegmentIndicator: SegmentIndicator,
  SegmentInput: SegmentInput,
  SegmentLabel: SegmentLabel,
  SegmentControl: SegmentControl,
})

export {
  Segment,
  SegmentControl,
  SegmentGroup,
  SegmentGroupLabel,
  SegmentIndicator,
  SegmentInput,
  SegmentLabel,
  segmentGroupAnatomy,
  useSegmentContext,
  useSegmentGroupContext,
}

export type {
  SegmentControlProps,
  SegmentGroupLabelProps,
  SegmentGroupProps,
  SegmentIndicatorProps,
  SegmentInputProps,
  SegmentLabelProps,
  SegmentProps,
}
