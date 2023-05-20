import { createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import {
  Slider,
  SliderControl,
  SliderLabel,
  SliderMarker,
  SliderMarkerGroup,
  SliderOutput,
  SliderRange,
  SliderThumb,
  SliderTrack,
} from './'
import './slider.css'

const meta: Meta = {
  title: 'Slider',
}

export default meta

export const Basic = () => {
  const [value, setValue] = createSignal(30)
  return (
    <Slider min={-50} max={50} value={value()} onChange={(e) => setValue(e.value)}>
      <SliderLabel>Label</SliderLabel>
      <SliderOutput>{value}</SliderOutput>
      <SliderControl>
        <SliderTrack>
          <SliderRange />
        </SliderTrack>
        <SliderThumb />
      </SliderControl>
      <SliderMarkerGroup>
        <SliderMarker value={-30}>*</SliderMarker>
        <SliderMarker value={0}>*</SliderMarker>
        <SliderMarker value={30}>*</SliderMarker>
      </SliderMarkerGroup>
    </Slider>
  )
}
