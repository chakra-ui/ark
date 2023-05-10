import { createSignal, For } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import {
  RangeSlider,
  RangeSliderControl,
  RangeSliderLabel,
  RangeSliderMarker,
  RangeSliderMarkerGroup,
  RangeSliderOutput,
  RangeSliderRange,
  RangeSliderThumb,
  RangeSliderTrack,
} from '.'
import './range-slider.css'

const meta: Meta = {
  title: 'RangeSlider',
}

export default meta

export const Basic = () => {
  const [values, setValues] = createSignal([-20, 20])
  return (
    <RangeSlider min={-50} max={50} value={values()} onChange={(e) => setValues(e.value)}>
      <RangeSliderLabel>Quantity: </RangeSliderLabel>
      <RangeSliderOutput>{(api) => api().value.join(' ')}</RangeSliderOutput>
      <RangeSliderControl>
        <RangeSliderTrack>
          <RangeSliderRange />
        </RangeSliderTrack>
        <For each={values()}>{(_, i) => <RangeSliderThumb index={i} />}</For>
      </RangeSliderControl>
      <RangeSliderMarkerGroup>
        <RangeSliderMarker value={-30}>*</RangeSliderMarker>
        <RangeSliderMarker value={0}>*</RangeSliderMarker>
        <RangeSliderMarker value={30}>*</RangeSliderMarker>
      </RangeSliderMarkerGroup>
    </RangeSlider>
  )
}
