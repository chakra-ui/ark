import { useState } from 'react'
import { flushSync } from 'react-dom'
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

export const Basic = () => {
  const [value, setValue] = useState(30)
  return (
    // TODO move this into use-slider.ts
    <Slider min={-50} max={50} value={value} onChange={(e) => flushSync(() => setValue(e.value))}>
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

export const WithDefaultVavlue = () => (
  <Slider min={-50} max={50} defaultValue={42}>
    <SliderControl>
      <SliderTrack>
        <SliderRange />
      </SliderTrack>
      <SliderThumb />
    </SliderControl>
  </Slider>
)
