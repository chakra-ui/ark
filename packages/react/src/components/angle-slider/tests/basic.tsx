import { AngleSlider } from '../'

export const ComponentUnderTest = (props: AngleSlider.RootProps) => {
  return (
    <AngleSlider.Root {...props}>
      <AngleSlider.Label>Wind direction</AngleSlider.Label>
      <AngleSlider.Control>
        <AngleSlider.Thumb data-testid="angle-slider-thumb" />
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
