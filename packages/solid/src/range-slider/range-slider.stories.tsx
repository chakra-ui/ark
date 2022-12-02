import { createSignal, For } from 'solid-js'
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
        <For each={values()}>
          {(_, i) => (
            <RangeSliderThumb index={i()}>
              <RangeSliderInput index={i()} />
            </RangeSliderThumb>
          )}
        </For>
      </RangeSliderControl>
    </RangeSlider>
  )
}
