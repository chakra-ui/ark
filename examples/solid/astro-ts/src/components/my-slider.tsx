import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from '@ark-ui/solid'

export const MySlider = () => (
  <Slider>
    <SliderLabel>Label</SliderLabel>
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb />
    </SliderControl>
  </Slider>
)
