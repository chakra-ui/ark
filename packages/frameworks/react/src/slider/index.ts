import { Slider as SliderRoot, type SliderProps } from './slider'
import { useSliderContext, type SliderContext } from './slider-context'
import { SliderControl, type SliderControlProps } from './slider-control'
import { SliderLabel, type SliderLabelProps } from './slider-label'
import { SliderMarker, type SliderMarkerProps } from './slider-marker'
import { SliderMarkerGroup, type SliderMarkerGroupProps } from './slider-marker-group'
import { SliderOutput, type SliderOutputProps } from './slider-output'
import { SliderRange, type SliderRangeProps } from './slider-range'
import { SliderThumb, type SliderThumbProps } from './slider-thumb'
import { SliderTrack, type SliderTrackProps } from './slider-track'

const Slider = Object.assign(SliderRoot, {
  Root: SliderRoot,
  Control: SliderControl,
  Label: SliderLabel,
  Marker: SliderMarker,
  MarkerGroup: SliderMarkerGroup,
  Output: SliderOutput,
  Range: SliderRange,
  Thumb: SliderThumb,
  Track: SliderTrack,
})

export {
  Slider,
  SliderControl,
  SliderLabel,
  SliderMarker,
  SliderMarkerGroup,
  SliderOutput,
  SliderRange,
  SliderThumb,
  SliderTrack,
  useSliderContext,
}

export type {
  SliderContext,
  SliderControlProps,
  SliderLabelProps,
  SliderMarkerGroupProps,
  SliderMarkerProps,
  SliderOutputProps,
  SliderProps,
  SliderRangeProps,
  SliderThumbProps,
  SliderTrackProps,
}
