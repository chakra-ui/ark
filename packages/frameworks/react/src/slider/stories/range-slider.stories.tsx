import type { Meta } from '@storybook/react'
import { Slider } from '../'
import './slider.css'

const meta: Meta = {
  title: 'Components / Slider / Range',
}

export default meta

export const Basic = () => {
  return (
    <Slider.Root defaultValue={[5, 10]}>
      <Slider.Label>Label</Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb key={0} index={0} />
        <Slider.Thumb key={1} index={1} />
      </Slider.Control>
    </Slider.Root>
  )
}

export const WithMarks = () => {
  return (
    <Slider.Root defaultValue={[10, 60]}>
      <Slider.Label>Label</Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb key={0} index={0} />
        <Slider.Thumb key={1} index={1} />
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
  <Slider.Root defaultValue={[9, 42]}>
    <Slider.Label>Label</Slider.Label>
    <Slider.ValueText />
    <Slider.Control>
      <Slider.Track>
        <Slider.Range />
      </Slider.Track>
      <Slider.Thumb key={0} index={0} />
      <Slider.Thumb key={1} index={1} />
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
    <Slider.Root min={-10} max={10} defaultValue={[-5, 5]}>
      <Slider.Label>Label</Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb key={0} index={0} />
        <Slider.Thumb key={1} index={1} />
      </Slider.Control>
    </Slider.Root>
  )
}

export const Step = () => {
  return (
    <Slider.Root step={0.01} min={5} max={10} defaultValue={[7.5, 8]}>
      <Slider.Label>Label</Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb key={0} index={0} />
        <Slider.Thumb key={1} index={1} />
      </Slider.Control>
    </Slider.Root>
  )
}

export const OnEvent = () => {
  return (
    <Slider.Root
      defaultValue={[5, 10]}
      onValueChange={(details) => console.log(details.value)}
      onValueChangeEnd={(details) => console.log(details.value)}
    >
      <Slider.Label>Label</Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb key={0} index={0} />
        <Slider.Thumb key={1} index={1} />
      </Slider.Control>
    </Slider.Root>
  )
}

export const Vertical = () => {
  return (
    <Slider.Root orientation="vertical" defaultValue={[5, 60]}>
      <Slider.Label>Label</Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb key={0} index={0} />
        <Slider.Thumb key={1} index={1} />
      </Slider.Control>
    </Slider.Root>
  )
}

export const ThumbOverlap = () => {
  return (
    <Slider.Root minStepsBetweenThumbs={1} defaultValue={[5, 60]}>
      <Slider.Label>Label</Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb key={0} index={0} />
        <Slider.Thumb key={1} index={1} />
      </Slider.Control>
    </Slider.Root>
  )
}
