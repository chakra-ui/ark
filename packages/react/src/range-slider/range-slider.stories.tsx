import { useState } from 'react'
import { RangeSlider } from './range-slider'
import { RangeSliderControl } from './range-slider-control'
import { RangeSliderInput } from './range-slider-input'
import { RangeSliderRange } from './range-slider-range'
import { RangeSliderThumb } from './range-slider-thumb'
import { RangeSliderTrack } from './range-slider-track'
import './range-slider.css'

export const Basic = () => {
  const [values, setValues] = useState([-10, 10])
  return (
    <RangeSlider min={-50} max={50} value={values} onChange={(e) => setValues(e.value)}>
      <RangeSliderControl>
        <RangeSliderTrack>
          <RangeSliderRange />
        </RangeSliderTrack>
        {values.map((_, index) => (
          <RangeSliderThumb key={index} index={index}>
            <RangeSliderInput index={index} />
          </RangeSliderThumb>
        ))}
      </RangeSliderControl>
    </RangeSlider>
  )
}
