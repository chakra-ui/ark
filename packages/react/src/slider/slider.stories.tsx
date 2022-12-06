import { useState } from 'react'
import { flushSync } from 'react-dom'
import { Slider } from './slider'
import { SliderControl } from './slider-control'
import { SliderInput } from './slider-input'
import { SliderRange } from './slider-range'
import { SliderThumb } from './slider-thumb'
import { SliderTrack } from './slider-track'
import './slider.css'

export const Basic = () => {
  const [value, setValue] = useState(30)
  return (
    // TODO move this into use-slider.ts
    <Slider min={-50} max={50} value={value} onChange={(e) => flushSync(() => setValue(e.value))}>
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

export const WithDefaultVavlue = () => (
  <Slider min={-50} max={50} defaultValue={42}>
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
