import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderMarker,
  SliderMarkerGroup,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from '@ark-ui/react'

export const DemoSlider = () => (
  <Slider min={-50} max={50} defaultValue={0}>
    <SliderLabel>Label</SliderLabel>
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb />
    </SliderControl>
    <SliderMarkerGroup>
      <SliderMarker value={-30}>*</SliderMarker>
      <SliderMarker value={0}>*</SliderMarker>
      <SliderMarker value={30}>*</SliderMarker>
    </SliderMarkerGroup>
  </Slider>
)
