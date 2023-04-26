import type { Meta } from '@storybook/react'
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

type RangeSliderType = typeof RangeSlider

const meta: Meta<RangeSliderType> = {
  title: 'RangeSlider',
  component: RangeSlider,
}

export default meta

export const Basic = () => {
  const [values, setValues] = useState([33, 66])
  return (
    <RangeSlider min={0} max={100} value={values} onChange={(e) => setValues(e.value)}>
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
  <RangeSlider min={0} max={100} defaultValue={[33, 66]}>
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
