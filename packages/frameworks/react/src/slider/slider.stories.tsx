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
  return (
    <Slider>
      <Slider.Label>Label</Slider.Label>
      <Slider.Output>{({ value }) => value.join(' ')}</Slider.Output>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb key={0} index={0} />
      </Slider.Control>
    </Slider>
  )
}

export const WithMarks = () => {
  return (
    <Slider.Root>
      <Slider.Label>Label</Slider.Label>
      <Slider.Output>{({ value }) => value.join(' ')}</Slider.Output>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb key={0} index={0} />
      </Slider.Control>
      <Slider.MarkerGroup>
        <Slider.Marker value={0}>0</Slider.Marker>
        <Slider.Marker value={25}>*</Slider.Marker>
        <Slider.Marker value={50}>50</Slider.Marker>
        <Slider.Marker value={75}>*</Slider.Marker>
      </Slider.MarkerGroup>
    </Slider.Root>
  )
}

export const InitialValue = () => (
  <Slider.Root defaultValue={[42]}>
    <Slider.Label>Label</Slider.Label>
    <Slider.Output>{({ value }) => value.join(' ')}</Slider.Output>
    <Slider.Control>
      <Slider.Track>
        <Slider.Range />
      </Slider.Track>
      <Slider.Thumb key={0} index={0} />
    </Slider.Control>
    <Slider.MarkerGroup>
      <Slider.Marker value={0}>*</Slider.Marker>
      <Slider.Marker value={30}>*</Slider.Marker>
      <Slider.Marker value={60}>*</Slider.Marker>
    </Slider.MarkerGroup>
  </Slider.Root>
)

export const MinMax = () => {
  return (
    <Slider min={-10} max={10}>
      <Slider.Label>Label</Slider.Label>
      <Slider.Output>{({ value }) => value.join(' ')}</Slider.Output>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb key={0} index={0} />
      </Slider.Control>
    </Slider>
  )
}

export const Step = () => {
  return (
    <Slider step={0.01} min={5} max={10}>
      <Slider.Label>Label</Slider.Label>
      <Slider.Output>{({ value }) => value.join(' ')}</Slider.Output>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb key={0} index={0} />
      </Slider.Control>
    </Slider>
  )
}

export const OnEvent = () => {
  return (
    <Slider
      onValueChange={(details) => console.log(details.value)}
      onValueChangeEnd={(details) => console.log(details.value)}
    >
      <Slider.Label>Label</Slider.Label>
      <Slider.Output>{({ value }) => value.join(' ')}</Slider.Output>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb key={0} index={0} />
      </Slider.Control>
    </Slider>
  )
}

export const Vertical = () => {
  return (
    <Slider orientation="vertical">
      <Slider.Label>Label</Slider.Label>
      <Slider.Output>{({ value }) => value.join(' ')}</Slider.Output>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb key={0} index={0} />
      </Slider.Control>
    </Slider>
  )
}

export const CenterOrigin = () => {
  return (
    <Slider origin="center">
      <Slider.Label>Label</Slider.Label>
      <Slider.Output>{({ value }) => value.join(' ')}</Slider.Output>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb key={0} index={0} />
      </Slider.Control>
    </Slider>
  )
}

export const Advanced = () => {
  const [values, setValues] = useState([-10, 20])
  return (
    <Slider.Root min={-50} max={50} value={values} onValueChange={(e) => setValues(e.value)}>
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
