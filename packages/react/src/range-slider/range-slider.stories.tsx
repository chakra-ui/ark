import { useState } from 'react'
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
} from './'
import './range-slider.css'

export const Basic = () => {
  const [values, setValues] = useState([-10, 10])
  return (
    <RangeSlider min={-50} max={50} value={values} onChange={(e) => setValues(e.value)}>
      <RangeSliderLabel>Label</RangeSliderLabel>
      <RangeSliderOutput>{({ value }) => value.join(' ')}</RangeSliderOutput>
      <RangeSliderControl>
        <RangeSliderTrack>
          <RangeSliderRange />
        </RangeSliderTrack>
        {values.map((_, index) => (
          <RangeSliderThumb key={index} index={index} />
        ))}
      </RangeSliderControl>
      <RangeSliderMarkerGroup>
        <RangeSliderMarker value={-30}>*</RangeSliderMarker>
        <RangeSliderMarker value={0}>*</RangeSliderMarker>
        <RangeSliderMarker value={30}>*</RangeSliderMarker>
      </RangeSliderMarkerGroup>
    </RangeSlider>
  )
}

export const WithDefaultValue = () => (
  <RangeSlider min={-50} max={50} defaultValue={[-10, 10]}>
    <RangeSliderLabel>Label</RangeSliderLabel>
    <RangeSliderOutput>{({ value }) => value.join(' ')}</RangeSliderOutput>
    <RangeSliderControl>
      <RangeSliderTrack>
        <RangeSliderRange />
      </RangeSliderTrack>
      {[0, 1].map((_, index) => (
        <RangeSliderThumb key={index} index={index} />
      ))}
    </RangeSliderControl>
    <RangeSliderMarkerGroup>
      <RangeSliderMarker value={-30}>*</RangeSliderMarker>
      <RangeSliderMarker value={0}>*</RangeSliderMarker>
      <RangeSliderMarker value={30}>*</RangeSliderMarker>
    </RangeSliderMarkerGroup>
  </RangeSlider>
)
