export type {
  FocusChangeDetails as SliderFocusChangeDetails,
  ValueChangeDetails as SliderValueChangeDetails,
} from '@zag-js/slider'
export { default as SliderContext, type SliderContextProps } from './slider-context.vue'
export { default as SliderControl, type SliderControlProps } from './slider-control.vue'
export { default as SliderLabel, type SliderLabelProps } from './slider-label.vue'
export { default as SliderMarker, type SliderMarkerProps } from './slider-marker.vue'
export {
  default as SliderMarkerGroup,
  type SliderMarkerGroupProps,
} from './slider-marker-group.vue'
export { default as SliderRange, type SliderRangeProps } from './slider-range.vue'
export {
  default as SliderRoot,
  type SliderRootProps,
  type SliderRootEmits,
} from './slider-root.vue'
export { default as SliderThumb, type SliderThumbProps } from './slider-thumb.vue'
export { default as SliderTrack, type SliderTrackProps } from './slider-track.vue'
export { default as SliderValueText, type SliderValueTextProps } from './slider-value-text.vue'
export { type UseSliderContext, useSliderContext } from './use-slider-context'
export * as Slider from './slider'
