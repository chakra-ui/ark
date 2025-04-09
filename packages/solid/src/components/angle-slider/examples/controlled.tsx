import { AngleSlider } from '@ark-ui/solid/angle-slider'
import { For, createSignal } from 'solid-js'

export const Controlled = () => {
  const [value, setValue] = createSignal(0)

  return (
    <AngleSlider.Root value={value()} onValueChange={(e) => setValue(e.value)}>
      <AngleSlider.Label>Angle</AngleSlider.Label>
      <AngleSlider.Control>
        <AngleSlider.Thumb />
        <AngleSlider.MarkerGroup>
          <For each={[0, 45, 90, 135, 180, 225, 270, 315]}>
            {(value) => <AngleSlider.Marker value={value}>{value}°</AngleSlider.Marker>}
          </For>
        </AngleSlider.MarkerGroup>
      </AngleSlider.Control>
      <AngleSlider.ValueText />
      <AngleSlider.HiddenInput />
    </AngleSlider.Root>
  )
}
