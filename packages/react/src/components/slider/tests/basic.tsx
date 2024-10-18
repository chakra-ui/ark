import { useState } from 'react'
import { Slider } from '../'

export const ComponentUnderTest = (props: Slider.RootProps) => {
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
          <Slider.Thumb key={index} index={index}>
            <Slider.DraggingIndicator />
            <Slider.HiddenInput />
          </Slider.Thumb>
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
