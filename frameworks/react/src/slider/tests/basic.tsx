import { useState } from 'react'
import { Slider, type SliderRootProps } from '../'

export const ComponentUnderTest = (props: SliderRootProps) => {
  const [value, setValue] = useState([-20, 20])
  return (
    <Slider.Root
      min={-50}
      max={50}
      value={value}
      onValueChange={(e) => setValue(e.value)}
      {...props}
    >
      <Slider.Label>Quantity: </Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        {value.map((_, index) => (
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
