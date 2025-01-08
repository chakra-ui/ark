export type {
  FocusChangeDetails as SliderFocusChangeDetails,
  ValueChangeDetails as SliderValueChangeDetails,
} from '@zag-js/slider'
export {
  default as SliderRoot,
  type SliderRootProps,
  type SliderRootBaseProps,
} from './slider-root.svelte'
export {
  default as SliderRootProvider,
  type SliderRootProviderProps,
  type SliderRootProviderBaseProps,
} from './slider-root-provider.svelte'
export { default as SliderContext, type SliderContextProps } from './slider-context.svelte'
export {
  default as SliderControl,
  type SliderControlProps,
  type SliderControlBaseProps,
} from './slider-control.svelte'
export {
  default as SliderDraggingIndicator,
  type SliderDraggingIndicatorProps,
  type SliderDraggingIndicatorBaseProps,
} from './slider-dragging-indicator.svelte'
export {
  default as SliderHiddenInput,
  type SliderHiddenInputProps,
  type SliderHiddenInputBaseProps,
} from './slider-hidden-input.svelte'
export {
  default as SliderLabel,
  type SliderLabelProps,
  type SliderLabelBaseProps,
} from './slider-label.svelte'
export {
  default as SliderMarker,
  type SliderMarkerProps,
  type SliderMarkerBaseProps,
} from './slider-marker.svelte'
export {
  default as SliderMarkerGroup,
  type SliderMarkerGroupProps,
  type SliderMarkerGroupBaseProps,
} from './slider-marker-group.svelte'
export {
  default as SliderRange,
  type SliderRangeProps,
  type SliderRangeBaseProps,
} from './slider-range.svelte'
export {
  default as SliderThumb,
  type SliderThumbProps,
  type SliderThumbBaseProps,
} from './slider-thumb.svelte'
export {
  default as SliderTrack,
  type SliderTrackProps,
  type SliderTrackBaseProps,
} from './slider-track.svelte'
export {
  default as SliderValueText,
  type SliderValueTextProps,
  type SliderValueTextBaseProps,
} from './slider-value-text.svelte'
export { sliderAnatomy } from './slider.anatomy'
export { useSlider, type UseSliderProps, type UseSliderReturn } from './use-slider.svelte'
export { useSliderContext, type UseSliderContext } from './use-slider-context'

export * as Slider from './slider'
