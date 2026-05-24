export type {
  FocusChangeDetails as SliderFocusChangeDetails,
  ValueChangeDetails as SliderValueChangeDetails,
} from '@zag-js/slider'
export { SliderContext, type SliderContextProps } from './slider-context.tsx'
export { SliderControl, type SliderControlBaseProps, type SliderControlProps } from './slider-control.tsx'
export {
  SliderDraggingIndicator,
  type SliderDraggingIndicatorBaseProps,
  type SliderDraggingIndicatorProps,
} from './slider-dragging-indicator.tsx'
export {
  SliderHiddenInput,
  type SliderHiddenInputBaseProps,
  type SliderHiddenInputProps,
} from './slider-hidden-input.tsx'
export { SliderLabel, type SliderLabelBaseProps, type SliderLabelProps } from './slider-label.tsx'
export { SliderMarker, type SliderMarkerBaseProps, type SliderMarkerProps } from './slider-marker.tsx'
export {
  SliderMarkerGroup,
  type SliderMarkerGroupBaseProps,
  type SliderMarkerGroupProps,
} from './slider-marker-group.tsx'
export { SliderRange, type SliderRangeBaseProps, type SliderRangeProps } from './slider-range.tsx'
export { SliderRoot, type SliderRootBaseProps, type SliderRootProps } from './slider-root.tsx'
export {
  SliderRootProvider,
  type SliderRootProviderBaseProps,
  type SliderRootProviderProps,
} from './slider-root-provider.tsx'
export { SliderThumb, type SliderThumbBaseProps, type SliderThumbProps } from './slider-thumb.tsx'
export { SliderTrack, type SliderTrackBaseProps, type SliderTrackProps } from './slider-track.tsx'
export { SliderValueText, type SliderValueTextBaseProps, type SliderValueTextProps } from './slider-value-text.tsx'
export { sliderAnatomy } from './slider.anatomy.ts'
export { useSlider, type UseSliderProps, type UseSliderReturn } from './use-slider.ts'
export { useSliderContext, type UseSliderContext } from './use-slider-context.ts'

export * as Slider from './slider.ts'
