import type { Meta } from '@storybook/react'
import { useState } from 'react'
import { Slider } from '.'
import './slider.css'

type SliderType = typeof Slider

const meta: Meta<SliderType> = {
  title: 'Slider',
  component: Slider,
}

export default meta

export const Basic = () => {
  const [values, setValues] = useState([33, 66])
  return (
    <Slider.Root min={0} max={100} value={values} onValueChange={(e) => setValues(e.value)}>
      <Slider.Label>Label</Slider.Label>
      <Slider.Output>{({ value }) => value.join(' ')}</Slider.Output>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        {values.map((_, index) => (
          <Slider.Thumb key={index} index={index} />
        ))}
      </Slider.Control>
      <Slider.MarkerGroup>
        <Slider.Marker value={-30}>*</Slider.Marker>
        <Slider.Marker value={0}>*</Slider.Marker>
        <Slider.Marker value={30}>*</Slider.Marker>
      </Slider.MarkerGroup>
    </Slider.Root>
  )
}

export const WithDefaultValue = () => (
  <Slider.Root min={0} max={100} defaultValue={[33, 66]}>
    <Slider.Label>Label</Slider.Label>
    <Slider.Output>{({ value }) => value.join(' ')}</Slider.Output>
    <Slider.Control>
      <Slider.Track>
        <Slider.Range />
      </Slider.Track>
      {[0, 1].map((_, index) => (
        <Slider.Thumb key={index} index={index} />
      ))}
    </Slider.Control>
    <Slider.MarkerGroup>
      <Slider.Marker value={-30}>*</Slider.Marker>
      <Slider.Marker value={0}>*</Slider.Marker>
      <Slider.Marker value={30}>*</Slider.Marker>
    </Slider.MarkerGroup>
  </Slider.Root>
)
