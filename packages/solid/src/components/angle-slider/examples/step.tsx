import { AngleSlider } from '@ark-ui/solid/angle-slider'
import { For } from 'solid-js'

export const Step = () => {
  return (
    <AngleSlider.Root step={45}>
      <AngleSlider.Label>Angle</AngleSlider.Label>
      <AngleSlider.Control>
        <AngleSlider.Thumb />
        <AngleSlider.MarkerGroup>
          <For each={[0, 45, 90, 135, 180, 225, 270, 315]}>{(value) => <AngleSlider.Marker value={value} />}</For>
        </AngleSlider.MarkerGroup>
      </AngleSlider.Control>
      <AngleSlider.ValueText />
      <AngleSlider.HiddenInput />
    </AngleSlider.Root>
  )
}
