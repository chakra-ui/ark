import { createSignal } from 'solid-js'
import { Slider } from './slider'
import { SliderControl } from './slider-control'
import { SliderInput } from './slider-input'
import { SliderRange } from './slider-range'
import { SliderThumb } from './slider-thumb'
import { SliderTrack } from './slider-track'
import './slider.css'

export const Basic = () => {
  const [value, setValue] = createSignal(30)
  return (
    <Slider min={-50} max={50} value={value()} onChange={(e) => setValue(e.value)}>
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
