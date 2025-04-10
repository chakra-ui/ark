import { Slider } from '@ark-ui/solid/slider'

export const DraggingIndicator = () => {
  return (
    <Slider.Root>
      <Slider.Label>Label</Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0}>
          <Slider.DraggingIndicator />
          <Slider.HiddenInput />
        </Slider.Thumb>
      </Slider.Control>
    </Slider.Root>
  )
}
