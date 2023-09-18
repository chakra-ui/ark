import { RangeSlider as RangeSliderRoot, type RangeSliderProps } from './range-slider'
import { useRangeSliderContext, type RangeSliderContext } from './range-slider-context'
import { RangeSliderControl, type RangeSliderControlProps } from './range-slider-control'
import { RangeSliderLabel, type RangeSliderLabelProps } from './range-slider-label'
import { RangeSliderMarker, type RangeSliderMarkerProps } from './range-slider-marker'
import {
  RangeSliderMarkerGroup,
  type RangeSliderMarkerGroupProps,
} from './range-slider-marker-group'
import { RangeSliderOutput, type RangeSliderOutputProps } from './range-slider-output'
import { RangeSliderRange, type RangeSliderRangeProps } from './range-slider-range'
import { RangeSliderThumb, type RangeSliderThumbProps } from './range-slider-thumb'
import { RangeSliderTrack, type RangeSliderTrackProps } from './range-slider-track'

const RangeSlider = Object.assign(RangeSliderRoot, {
  Root: RangeSliderRoot,
  Control: RangeSliderControl,
  Label: RangeSliderLabel,
  Marker: RangeSliderMarker,
  MarkerGroup: RangeSliderMarkerGroup,
  Output: RangeSliderOutput,
  Range: RangeSliderRange,
  Thumb: RangeSliderThumb,
  Track: RangeSliderTrack,
})

export {
  RangeSlider,
  RangeSliderControl,
  RangeSliderLabel,
  RangeSliderMarker,
  RangeSliderMarkerGroup,
  RangeSliderOutput,
  RangeSliderRange,
  RangeSliderThumb,
  RangeSliderTrack,
  useRangeSliderContext,
}

export type {
  RangeSliderContext,
  RangeSliderControlProps,
  RangeSliderLabelProps,
  RangeSliderMarkerGroupProps,
  RangeSliderMarkerProps,
  RangeSliderOutputProps,
  RangeSliderProps,
  RangeSliderRangeProps,
  RangeSliderThumbProps,
  RangeSliderTrackProps,
}
