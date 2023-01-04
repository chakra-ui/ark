import { slider } from '@/panda/recipes'
import {
  Slider,
  SliderControl,
  SliderMarker,
  SliderMarkerGroup,
  SliderProps,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from '@ark-ui/react'

export const DemoSlider = (props: Partial<SliderProps>) => (
  <Slider min={0} max={100} defaultValue={33} className={slider()} {...props}>
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
