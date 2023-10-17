import { createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { Slider } from './'
import './slider.css'

const meta: Meta = {
  title: 'Slider',
}

export default meta

export const Basic = () => {
  const [value, setValue] = createSignal([30])
  return (
    <Slider.Root min={-50} max={50} value={value()} onValueChange={(e) => setValue(e.value)}>
      <Slider.Label>Label</Slider.Label>
      <Slider.Output>{value}</Slider.Output>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} />
      </Slider.Control>
      <Slider.MarkerGroup>
        <Slider.Marker value={-30}>*</Slider.Marker>
        <Slider.Marker value={0}>*</Slider.Marker>
        <Slider.Marker value={30}>*</Slider.Marker>
      </Slider.MarkerGroup>
    </Slider.Root>
  )
}
