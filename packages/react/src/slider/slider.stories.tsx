import { Slider } from './slider'
import { SliderControl } from './slider-control'
import { SliderInput } from './slider-input'
import { SliderRange } from './slider-range'
import { SliderThumb } from './slider-thumb'
import { SliderTrack } from './slider-track'
import './slider.css'

export const Basic = () => {
  return (
    <Slider min={-50} max={50} defaultValue={30}>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb>
          <SliderInput />
        </SliderThumb>
      </SliderControl>
    </Slider>
  )
}
