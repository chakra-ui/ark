import type { FocusChangeDetails, ValueChangeDetails } from '@zag-js/slider'
import { SliderContext as Context, type SliderContextProps as ContextProps } from './slider-context'
import { SliderControl as Control, type SliderControlProps as ControlProps } from './slider-control'
import { SliderLabel as Label, type SliderLabelProps as LabelProps } from './slider-label'
import { SliderMarker as Marker, type SliderMarkerProps as MarkerProps } from './slider-marker'
import {
  SliderMarkerGroup as MarkerGroup,
  type SliderMarkerGroupProps as MarkerGroupProps,
} from './slider-marker-group'
import { SliderRange as Range, type SliderRangeProps as RangeProps } from './slider-range'
import { SliderRoot as Root, type SliderRootProps as RootProps } from './slider-root'
import { SliderThumb as Thumb, type SliderThumbProps as ThumbProps } from './slider-thumb'
import { SliderTrack as Track, type SliderTrackProps as TrackProps } from './slider-track'
import {
  SliderValueText as ValueText,
  type SliderValueTextProps as ValueTextProps,
} from './slider-value-text'

export { Context, Control, Label, Marker, MarkerGroup, Range, Root, Thumb, Track, ValueText }
export type {
  ContextProps,
  ControlProps,
  FocusChangeDetails,
  LabelProps,
  MarkerGroupProps,
  MarkerProps,
  RangeProps,
  RootProps,
  ThumbProps,
  TrackProps,
  ValueChangeDetails,
  ValueTextProps,
}
