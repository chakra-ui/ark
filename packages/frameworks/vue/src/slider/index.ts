import type {
  FocusChangeDetails as SliderFocusChangeDetails,
  ValueChangeDetails as SliderValueChangeDetails,
} from '@zag-js/slider'
import { useSliderContext, type SliderContext } from './slider-context'
import { SliderControl, type SliderControlProps } from './slider-control'
import { SliderLabel, type SliderLabelProps } from './slider-label'
import { SliderMarker, type SliderMarkerProps } from './slider-marker'
import { SliderMarkerGroup, type SliderMarkerGroupProps } from './slider-marker-group'
import { SliderRange, type SliderRangeProps } from './slider-range'
import { SliderRoot, type SliderRootProps } from './slider-root'
import { SliderThumb, type SliderThumbProps } from './slider-thumb'
import { SliderTrack, type SliderTrackProps } from './slider-track'
import { SliderValueText, type SliderValueTextProps } from './slider-value-text'

export * as Slider from './slider'

export {
  SliderControl,
  SliderLabel,
  SliderMarker,
  SliderMarkerGroup,
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
  SliderValueText,
  useSliderContext,
}

export type {
  SliderContext,
  SliderControlProps,
  SliderFocusChangeDetails,
  SliderLabelProps,
  SliderMarkerGroupProps,
  SliderMarkerProps,
  SliderRangeProps,
  SliderRootProps,
  SliderThumbProps,
  SliderTrackProps,
  SliderValueChangeDetails,
  SliderValueTextProps,
}
