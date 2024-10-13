import { Slider, useSlider } from '@ark-ui/solid/slider'

export const RootProvider = () => {
  const slider = useSlider()

  return (
    <>
      <button onClick={() => slider().focus()}>Focus</button>

      <Slider.RootProvider value={slider}>
        <Slider.Label>Label</Slider.Label>
        <Slider.ValueText />
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0}>
            <Slider.HiddenInput />
          </Slider.Thumb>
        </Slider.Control>
      </Slider.RootProvider>
    </>
  )
}
