import { Slider } from '..'

export const Range = () => {
  return (
    <Slider.Root defaultValue={[5, 10]}>
      <Slider.Label>Label</Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb key={0} index={0} />
        <Slider.Thumb key={1} index={1} />
      </Slider.Control>
    </Slider.Root>
  )
}
