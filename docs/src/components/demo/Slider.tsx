import {
  Slider,
  SliderControl,
  SliderMarker,
  SliderMarkerGroup,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from '@ark-ui/react'
import { slider } from '../../../panda/recipes'

export const DemoSlider = () => (
  <Slider min={0} max={100} defaultValue={33} className={slider()}>
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb />
    </SliderControl>
    <SliderMarkerGroup>
      <SliderMarker value={25}>25</SliderMarker>
      <SliderMarker value={50}>50</SliderMarker>
      <SliderMarker value={75}>75</SliderMarker>
    </SliderMarkerGroup>
  </Slider>
)
