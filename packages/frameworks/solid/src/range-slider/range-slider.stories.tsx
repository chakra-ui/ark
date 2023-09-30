import { createSignal, Index } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { RangeSlider } from './'
import './range-slider.css'

const meta: Meta = {
  title: 'RangeSlider',
}

export default meta

export const Basic = () => {
  const [values, setValues] = createSignal([-20, 20])
  return (
    <RangeSlider.Root min={-50} max={50} value={values()} onValueChange={(e) => setValues(e.value)}>
      <RangeSlider.Label>Quantity: </RangeSlider.Label>
      <RangeSlider.Output>{(api) => api().value.join(' ')}</RangeSlider.Output>
      <RangeSlider.Control>
        <RangeSlider.Track>
          <RangeSlider.Range />
        </RangeSlider.Track>
        <Index each={values()}>{(_, i) => <RangeSlider.Thumb index={i} />}</Index>
      </RangeSlider.Control>
      <RangeSlider.MarkerGroup>
        <RangeSlider.Marker value={-30}>*</RangeSlider.Marker>
        <RangeSlider.Marker value={0}>*</RangeSlider.Marker>
        <RangeSlider.Marker value={30}>*</RangeSlider.Marker>
      </RangeSlider.MarkerGroup>
    </RangeSlider.Root>
  )
}
