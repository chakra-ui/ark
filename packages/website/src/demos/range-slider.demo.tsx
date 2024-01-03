import { Slider, type SliderProps } from '~/components/ui'

export const Demo = (props: SliderProps) => {
  return (
    <Slider.Root min={0} max={100} defaultValue={[33, 66]} {...props}>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb key={0} index={0} />
        <Slider.Thumb key={1} index={1} />
      </Slider.Control>
      <Slider.MarkerGroup>
        <Slider.Marker value={25}>25</Slider.Marker>
        <Slider.Marker value={50}>50</Slider.Marker>
        <Slider.Marker value={75}>75</Slider.Marker>
      </Slider.MarkerGroup>
    </Slider.Root>
  )
}
