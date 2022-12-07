import { useState } from 'react'
import { RangeSlider } from './range-slider'
import { RangeSliderControl } from './range-slider-control'
import { RangeSliderInput } from './range-slider-input'
import { RangeSliderLabel } from './range-slider-label'
import { RangeSliderOutput } from './range-slider-output'
import { RangeSliderRange } from './range-slider-range'
import { RangeSliderThumb } from './range-slider-thumb'
import { RangeSliderTrack } from './range-slider-track'
import './range-slider.css'

// TODO add marker and makrergroup
export const Basic = () => {
  const [values, setValues] = useState([-10, 10])
  return (
    <RangeSlider min={-50} max={50} value={values} onChange={(e) => setValues(e.value)}>
      <>
        <RangeSliderLabel>Quantity: </RangeSliderLabel>
        <RangeSliderOutput>{({ value }) => value.join(' ')}</RangeSliderOutput>
      </>
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
