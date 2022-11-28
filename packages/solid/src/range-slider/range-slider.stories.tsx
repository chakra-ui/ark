import { createSignal } from 'solid-js'
import {
  RangeSlider,
  RangeSliderControl,
  RangeSliderInput,
  RangeSliderLabel,
  RangeSliderOutput,
  RangeSliderRange,
  RangeSliderThumb,
  RangeSliderTrack,
} from '.'
import './range-slider.css'

export const Basic = () => {
  const [values, setValues] = createSignal([-10, 10])
  return (
    <RangeSlider min={-50} max={50} value={values()} onChange={(e) => setValues(e.value)}>
      <>
        <RangeSliderLabel>Quantity: </RangeSliderLabel>
        <RangeSliderOutput>{({ value }) => value.join(' ')}</RangeSliderOutput>
      </>
      <RangeSliderControl>
        <RangeSliderTrack>
          <RangeSliderRange />
        </RangeSliderTrack>
        {values().map((_, index) => (
          <RangeSliderThumb index={index}>
            <RangeSliderInput index={index} />
          </RangeSliderThumb>
        ))}
      </RangeSliderControl>
    </RangeSlider>
  )
}
