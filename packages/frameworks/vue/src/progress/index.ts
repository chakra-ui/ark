import { Progress as ProgressRoot, type ProgressProps } from './progress'
import { ProgressCircle, type ProgressCircleProps } from './progress-circle'
import { ProgressCircleRange, type ProgressCircleRangeProps } from './progress-circle-range'
import { ProgressCircleTrack, type ProgressCircleTrackProps } from './progress-circle-track'
import { useProgressContext, type ProgressContext } from './progress-context'
import { ProgressIndicator, type ProgressIndicatorProps } from './progress-indicator'
import { ProgressLabel, type ProgressLabelProps } from './progress-label'
import { ProgressRange, type ProgressRangeProps } from './progress-range'
import { ProgressTrack, type ProgressTrackProps } from './progress-track'
import { ProgressValueText, type ProgressValueTextProps } from './progress-value-text'

const Progress = Object.assign(ProgressRoot, {
  Root: ProgressRoot,
  Label: ProgressLabel,
  Track: ProgressTrack,
  Range: ProgressRange,
  ValueText: ProgressValueText,
  Indicator: ProgressIndicator,
  Circle: ProgressCircle,
  CircleTrack: ProgressCircleTrack,
  CircleRange: ProgressCircleRange,
})

export {
  Progress,
  ProgressCircle,
  ProgressCircleRange,
  ProgressCircleTrack,
  ProgressIndicator,
  ProgressLabel,
  ProgressRange,
  ProgressTrack,
  ProgressValueText,
  useProgressContext,
}
export type {
  ProgressCircleProps,
  ProgressCircleRangeProps,
  ProgressCircleTrackProps,
  ProgressContext,
  ProgressIndicatorProps,
  ProgressLabelProps,
  ProgressProps,
  ProgressRangeProps,
  ProgressTrackProps,
  ProgressValueTextProps,
}
