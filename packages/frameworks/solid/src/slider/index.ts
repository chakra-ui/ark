import { Slider as SliderRoot, type SliderProps } from './slider'
import { useSliderContext, type SliderContext } from './slider-context'
import { SliderControl, type SliderControlProps } from './slider-control'
import { SliderLabel, type SliderLabelProps } from './slider-label'
import { SliderMarker, type SliderMarkerProps } from './slider-marker'
import { SliderMarkerGroup, type SliderMarkerGroupProps } from './slider-marker-group'
import { SliderRange, type SliderRangeProps } from './slider-range'
import { SliderThumb, type SliderThumbProps } from './slider-thumb'
import { SliderTrack, type SliderTrackProps } from './slider-track'
import { SliderValueText, type SliderValueTextProps } from './slider-value-text'

const Slider = Object.assign(SliderRoot, {
  Root: SliderRoot,
  Control: SliderControl,
  Label: SliderLabel,
  Marker: SliderMarker,
  MarkerGroup: SliderMarkerGroup,
  Range: SliderRange,
  Thumb: SliderThumb,
  Track: SliderTrack,
  ValueText: SliderValueText,
})

export {
  Slider,
  SliderControl,
  SliderLabel,
  SliderMarker,
  SliderMarkerGroup,
  SliderRange,
  SliderThumb,
  SliderTrack,
  SliderValueText,
  useSliderContext,
}

export type {
  SliderContext,
  SliderControlProps,
  SliderLabelProps,
  SliderMarkerGroupProps,
  SliderMarkerProps,
  SliderProps,
  SliderRangeProps,
  SliderThumbProps,
  SliderTrackProps,
  SliderValueTextProps,
}
