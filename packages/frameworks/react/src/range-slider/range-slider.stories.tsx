import type { Meta } from '@storybook/react'
import { useState } from 'react'
import { RangeSlider } from './'
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
    <RangeSlider.Root min={0} max={100} value={values} onValueChange={(e) => setValues(e.value)}>
      <RangeSlider.Label>Label</RangeSlider.Label>
      <RangeSlider.Output>{({ value }) => value.join(' ')}</RangeSlider.Output>
      <RangeSlider.Control>
        <RangeSlider.Track>
          <RangeSlider.Range />
        </RangeSlider.Track>
        {values.map((_, index) => (
          <RangeSlider.Thumb key={index} index={index} />
        ))}
      </RangeSlider.Control>
      <RangeSlider.MarkerGroup>
        <RangeSlider.Marker value={-30}>*</RangeSlider.Marker>
        <RangeSlider.Marker value={0}>*</RangeSlider.Marker>
        <RangeSlider.Marker value={30}>*</RangeSlider.Marker>
      </RangeSlider.MarkerGroup>
    </RangeSlider.Root>
  )
}

export const WithDefaultValue = () => (
  <RangeSlider.Root min={0} max={100} defaultValue={[33, 66]}>
    <RangeSlider.Label>Label</RangeSlider.Label>
    <RangeSlider.Output>{({ value }) => value.join(' ')}</RangeSlider.Output>
    <RangeSlider.Control>
      <RangeSlider.Track>
        <RangeSlider.Range />
      </RangeSlider.Track>
      {[0, 1].map((_, index) => (
        <RangeSlider.Thumb key={index} index={index} />
      ))}
    </RangeSlider.Control>
    <RangeSlider.MarkerGroup>
      <RangeSlider.Marker value={-30}>*</RangeSlider.Marker>
      <RangeSlider.Marker value={0}>*</RangeSlider.Marker>
      <RangeSlider.Marker value={30}>*</RangeSlider.Marker>
    </RangeSlider.MarkerGroup>
  </RangeSlider.Root>
)
