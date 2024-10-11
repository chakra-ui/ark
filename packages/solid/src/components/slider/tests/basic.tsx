import { Index, createSignal } from 'solid-js'
import { Slider } from '../'

export const ComponentUnderTest = (props: Slider.RootProps) => {
  const [value, setValue] = createSignal([-20, 20])
  return (
    <Slider.Root
      min={-50}
      max={50}
      value={value()}
      onValueChange={(e) => setValue(e.value)}
      {...props}
    >
      <Slider.Label>Quantity: </Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Index each={value()}>
          {(_value, index) => (
            <Slider.Thumb index={index}>
              <Slider.HiddenInput />
            </Slider.Thumb>
          )}
        </Index>
      </Slider.Control>
      <Slider.MarkerGroup>
        <Slider.Marker value={-30}>*</Slider.Marker>
        <Slider.Marker value={0}>*</Slider.Marker>
        <Slider.Marker value={30}>*</Slider.Marker>
      </Slider.MarkerGroup>
    </Slider.Root>
  )
}
