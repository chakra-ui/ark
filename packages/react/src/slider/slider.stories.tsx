import type { Meta } from '@storybook/react'
import { useState } from 'react'
import { Slider } from './'
import './slider.css'

type SliderType = typeof Slider

const meta: Meta<SliderType> = {
  title: 'Slider',
  component: Slider,
}

export default meta

export const Basic = () => {
  const [value, setValue] = useState(30)
  return (
    <Slider.Root min={-50} max={50} value={value} onChange={(details) => setValue(details.value)}>
      <Slider.Label>Label</Slider.Label>
      <Slider.Output>{value}</Slider.Output>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb />
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
  <Slider.Root min={-50} max={50} defaultValue={42}>
    <Slider.Control>
      <Slider.Track>
        <Slider.Range />
      </Slider.Track>
      <Slider.Thumb />
    </Slider.Control>
  </Slider.Root>
)
