import { AngleSlider } from '@ark-ui/react/angle-slider'

export const Step = () => {
  return (
    <AngleSlider.Root step={15}>
      <AngleSlider.Label>Wind direction (15 step)</AngleSlider.Label>
      <AngleSlider.Control>
        <AngleSlider.Thumb />
        <AngleSlider.MarkerGroup>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((value, i) => (
            <AngleSlider.Marker key={i} value={value} />
          ))}
        </AngleSlider.MarkerGroup>
      </AngleSlider.Control>
      <AngleSlider.ValueText />
      <AngleSlider.HiddenInput />
    </AngleSlider.Root>
  )
}
