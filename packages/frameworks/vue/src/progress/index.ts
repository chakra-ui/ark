import { ProgressCircle, type ProgressCircleProps } from './progress-circle'
import { ProgressCircleRange, type ProgressCircleRangeProps } from './progress-circle-range'
import { ProgressCircleTrack, type ProgressCircleTrackProps } from './progress-circle-track'
import { useProgressContext, type ProgressContext } from './progress-context'
import { ProgressLabel, type ProgressLabelProps } from './progress-label'
import { ProgressRange, type ProgressRangeProps } from './progress-range'
import { ProgressRoot, type ProgressRootProps } from './progress-root'
import { ProgressTrack, type ProgressTrackProps } from './progress-track'
import { ProgressValueText, type ProgressValueTextProps } from './progress-value-text'
import { ProgressView, type ProgressViewProps } from './progress-view'

export const Progress = {
  Root: ProgressRoot,
  Label: ProgressLabel,
  Track: ProgressTrack,
  Range: ProgressRange,
  ValueText: ProgressValueText,
  View: ProgressView,
  Circle: ProgressCircle,
  CircleTrack: ProgressCircleTrack,
  CircleRange: ProgressCircleRange,
}

export {
  ProgressCircle,
  ProgressCircleRange,
  ProgressCircleTrack,
  ProgressLabel,
  ProgressRange,
  ProgressRoot,
  ProgressTrack,
  ProgressValueText,
  ProgressView,
  useProgressContext,
}
export type {
  ProgressCircleProps,
  ProgressCircleRangeProps,
  ProgressCircleTrackProps,
  ProgressContext,
  ProgressLabelProps,
  ProgressRangeProps,
  ProgressRootProps,
  ProgressTrackProps,
  ProgressValueTextProps,
  ProgressViewProps,
}
