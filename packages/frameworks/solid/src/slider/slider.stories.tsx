import { Index, createSignal } from 'solid-js'
import type { Meta } from 'storybook-solidjs'
import { Slider } from './'
import './slider.css'

type SliderType = typeof Slider

const meta: Meta<SliderType> = {
  title: 'Slider',
  component: Slider,
}

export default meta

export const Basic = () => {
  return (
    <Slider>
      <Slider.Label>Label</Slider.Label>
      <Slider.ValueText>{(api) => api().value.join(' ')}</Slider.ValueText>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} />
      </Slider.Control>
    </Slider>
  )
}

export const WithMarks = () => {
  return (
    <Slider.Root>
      <Slider.Label>Label</Slider.Label>
      <Slider.ValueText>{(api) => api().value.join(' ')}</Slider.ValueText>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} />
      </Slider.Control>
      <Slider.MarkerGroup>
        <Slider.Marker value={0}>0</Slider.Marker>
        <Slider.Marker value={25}>*</Slider.Marker>
        <Slider.Marker value={50}>50</Slider.Marker>
        <Slider.Marker value={75}>*</Slider.Marker>
      </Slider.MarkerGroup>
    </Slider.Root>
  )
}

export const InitialValue = () => (
  <Slider.Root value={[42]}>
    <Slider.Label>Label</Slider.Label>
    <Slider.ValueText>{(api) => api().value.join(' ')}</Slider.ValueText>
    <Slider.Control>
      <Slider.Track>
        <Slider.Range />
      </Slider.Track>
      <Slider.Thumb index={0} />
    </Slider.Control>
    <Slider.MarkerGroup>
      <Slider.Marker value={0}>*</Slider.Marker>
      <Slider.Marker value={30}>*</Slider.Marker>
      <Slider.Marker value={60}>*</Slider.Marker>
    </Slider.MarkerGroup>
  </Slider.Root>
)

export const MinMax = () => {
  return (
    <Slider min={-10} max={10}>
      <Slider.Label>Label</Slider.Label>
      <Slider.ValueText>{(api) => api().value.join(' ')}</Slider.ValueText>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} />
      </Slider.Control>
    </Slider>
  )
}

export const Step = () => {
  return (
    <Slider step={0.01} min={5} max={10}>
      <Slider.Label>Label</Slider.Label>
      <Slider.ValueText>{(api) => api().value.join(' ')}</Slider.ValueText>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} />
      </Slider.Control>
    </Slider>
  )
}

export const OnEvent = () => {
  return (
    <Slider
      onValueChange={(details) => console.log(details.value)}
      onValueChangeEnd={(details) => console.log(details.value)}
    >
      <Slider.Label>Label</Slider.Label>
      <Slider.ValueText>{(api) => api().value.join(' ')}</Slider.ValueText>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} />
      </Slider.Control>
    </Slider>
  )
}

export const Vertical = () => {
  return (
    <Slider orientation="vertical">
      <Slider.Label>Label</Slider.Label>
      <Slider.ValueText>{(api) => api().value.join(' ')}</Slider.ValueText>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} />
      </Slider.Control>
    </Slider>
  )
}

export const CenterOrigin = () => {
  return (
    <Slider origin="center">
      <Slider.Label>Label</Slider.Label>
      <Slider.ValueText>{(api) => api().value.join(' ')}</Slider.ValueText>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} />
      </Slider.Control>
    </Slider>
  )
}

export const Advanced = () => {
  const [values, setValues] = createSignal([-10, 20])
  return (
    <Slider.Root min={-50} max={50} value={values()} onValueChange={(e) => setValues(e.value)}>
      <Slider.Label>Label</Slider.Label>
      <Slider.ValueText>{(api) => api().value.join(' ')}</Slider.ValueText>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Index each={values()}>{(_value, index) => <Slider.Thumb index={index} />}</Index>
      </Slider.Control>
      <Slider.MarkerGroup>
        <Slider.Marker value={-30}>*</Slider.Marker>
        <Slider.Marker value={0}>*</Slider.Marker>
        <Slider.Marker value={30}>*</Slider.Marker>
      </Slider.MarkerGroup>
    </Slider.Root>
  )
}
