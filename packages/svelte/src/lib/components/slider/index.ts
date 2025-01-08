export type {
  FocusChangeDetails as SliderFocusChangeDetails,
  ValueChangeDetails as SliderValueChangeDetails,
} from '@zag-js/slider'
export { default as SliderContext, type SliderContextProps } from './slider-context.svelte'
export {
  default as SliderControl,
  type SliderControlBaseProps,
  type SliderControlProps,
} from './slider-control.svelte'
export {
  default as SliderDraggingIndicator,
  type SliderDraggingIndicatorBaseProps,
  type SliderDraggingIndicatorProps,
} from './slider-dragging-indicator.svelte'
export {
  default as SliderHiddenInput,
  type SliderHiddenInputBaseProps,
  type SliderHiddenInputProps,
} from './slider-hidden-input.svelte'
export {
  default as SliderLabel,
  type SliderLabelBaseProps,
  type SliderLabelProps,
} from './slider-label.svelte'
export {
  default as SliderMarkerGroup,
  type SliderMarkerGroupBaseProps,
  type SliderMarkerGroupProps,
} from './slider-marker-group.svelte'
export {
  default as SliderMarker,
  type SliderMarkerBaseProps,
  type SliderMarkerProps,
} from './slider-marker.svelte'
export {
  default as SliderRange,
  type SliderRangeBaseProps,
  type SliderRangeProps,
} from './slider-range.svelte'
export {
  default as SliderRootProvider,
  type SliderRootProviderBaseProps,
  type SliderRootProviderProps,
} from './slider-root-provider.svelte'
export {
  default as SliderRoot,
  type SliderRootBaseProps,
  type SliderRootProps,
} from './slider-root.svelte'
export {
  default as SliderThumb,
  type SliderThumbBaseProps,
  type SliderThumbProps,
} from './slider-thumb.svelte'
export {
  default as SliderTrack,
  type SliderTrackBaseProps,
  type SliderTrackProps,
} from './slider-track.svelte'
export {
  default as SliderValueText,
  type SliderValueTextBaseProps,
  type SliderValueTextProps,
} from './slider-value-text.svelte'
export { sliderAnatomy } from './slider.anatomy'
export { useSliderContext, type UseSliderContext } from './use-slider-context'
export { useSlider, type UseSliderProps, type UseSliderReturn } from './use-slider.svelte'

export * as Slider from './slider'
