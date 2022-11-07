import { useState } from 'react'
import { flushSync } from 'react-dom'
import { RangeSlider } from './range-slider'
import { RangeSliderControl } from './range-slider-control'
import { RangeSliderInput } from './range-slider-input'
import { RangeSliderRange } from './range-slider-range'
import { RangeSliderThumb } from './range-slider-thumb'
import { RangeSliderTrack } from './range-slider-track'
// import './range-slider.css'

export const Basic = () => {
  const [value, setValue] = useState([10, 20])
  return (
    // TODO move this into use-slider.ts
    <RangeSlider
      min={-50}
      max={50}
      values={value}
      onChange={(e) => flushSync(() => setValue(e.value))}
    >
      <RangeSliderControl>
        <RangeSliderTrack>
          <RangeSliderRange />
        </RangeSliderTrack>
        <RangeSliderThumb>
          <RangeSliderInput />
        </RangeSliderThumb>
      </RangeSliderControl>
    </RangeSlider>
  )
}
