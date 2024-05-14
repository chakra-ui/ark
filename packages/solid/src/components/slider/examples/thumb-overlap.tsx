import { Slider } from '../..'

export const ThumbOverlap = () => {
  return (
    <Slider.Root minStepsBetweenThumbs={1} value={[5, 60]}>
      <Slider.Label>Label</Slider.Label>
      <Slider.ValueText />
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} />
        <Slider.Thumb index={1} />
      </Slider.Control>
    </Slider.Root>
  )
}
