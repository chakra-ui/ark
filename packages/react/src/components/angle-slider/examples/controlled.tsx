import { AngleSlider } from '@ark-ui/react/angle-slider'
import { useState } from 'react'

export const Controlled = () => {
  const [angle, setAngle] = useState(180)

  return (
    <AngleSlider.Root value={angle} onValueChange={({ value }) => setAngle(value)}>
      <AngleSlider.Label>Temperature</AngleSlider.Label>
      <AngleSlider.Control>
        <AngleSlider.Thumb />
        <AngleSlider.MarkerGroup>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((value, i) => (
            <AngleSlider.Marker key={i} value={value} />
          ))}
        </AngleSlider.MarkerGroup>
      </AngleSlider.Control>
      <AngleSlider.ValueText>{angle} ºC </AngleSlider.ValueText>
      <AngleSlider.HiddenInput />
    </AngleSlider.Root>
  )
}
