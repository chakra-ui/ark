export type {
  FocusChangeDetails as SliderFocusChangeDetails,
  ValueChangeDetails as SliderValueChangeDetails,
} from '@zag-js/slider'
export { default as SliderContext, type SliderContextProps } from './slider-context.vue'
export {
  default as SliderControl,
  type SliderControlBaseProps,
  type SliderControlProps,
} from './slider-control.vue'
export {
  default as SliderHiddenInput,
  type SliderHiddenInputBaseProps,
  type SliderHiddenInputProps,
} from './slider-hidden-input.vue'
export {
  default as SliderLabel,
  type SliderLabelBaseProps,
  type SliderLabelProps,
} from './slider-label.vue'
export {
  default as SliderMarkerGroup,
  type SliderMarkerGroupBaseProps,
  type SliderMarkerGroupProps,
} from './slider-marker-group.vue'
export {
  default as SliderMarker,
  type SliderMarkerBaseProps,
  type SliderMarkerProps,
} from './slider-marker.vue'
export {
  default as SliderRange,
  type SliderRangeBaseProps,
  type SliderRangeProps,
} from './slider-range.vue'
export {
  default as SliderRootProvider,
  type SliderRootProviderBaseProps,
  type SliderRootProviderProps,
} from './slider-root-provider.vue'
export {
  default as SliderRoot,
  type SliderRootBaseProps,
  type SliderRootEmits,
  type SliderRootProps,
} from './slider-root.vue'
export {
  default as SliderThumb,
  type SliderThumbBaseProps,
  type SliderThumbProps,
} from './slider-thumb.vue'
export {
  default as SliderTrack,
  type SliderTrackBaseProps,
  type SliderTrackProps,
} from './slider-track.vue'
export {
  default as SliderValueText,
  type SliderValueTextBaseProps,
  type SliderValueTextProps,
} from './slider-value-text.vue'
export { sliderAnatomy } from './slider.anatomy'
export { useSlider, type UseSliderProps, type UseSliderReturn } from './use-slider'
export { useSliderContext, type UseSliderContext } from './use-slider-context'

export * as Slider from './slider'
