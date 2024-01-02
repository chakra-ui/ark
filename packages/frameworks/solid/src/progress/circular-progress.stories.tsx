import type { Meta } from 'storybook-solidjs'
import { Progress } from './'
import './progress.css'

type ProgressType = typeof Progress

const meta: Meta<ProgressType> = {
  title: 'CircularProgress',
  component: Progress,
}

export default meta

export const Basic = () => (
  <Progress.Root>
    <Progress.Label>Label</Progress.Label>
    <Progress.ValueText />
    <Progress.Indicator state="loading" />
    <Progress.Circle>
      <Progress.CircleTrack />
      <Progress.CircleRange />
    </Progress.Circle>
  </Progress.Root>
)

export const InitialValue = () => (
  <Progress.Root value={70}>
    <Progress.Label>Label</Progress.Label>
    <Progress.ValueText />
    <Progress.Circle>
      <Progress.CircleTrack />
      <Progress.CircleRange />
    </Progress.Circle>
  </Progress.Root>
)

export const MinMax = () => (
  <Progress.Root value={20} min={10} max={30}>
    <Progress.Label>Label</Progress.Label>
    <Progress.ValueText />
    <Progress.Circle>
      <Progress.CircleTrack />
      <Progress.CircleRange />
    </Progress.Circle>
  </Progress.Root>
)

export const Indeterminate = () => (
  <Progress.Root>
    <Progress.Label>Label</Progress.Label>
    <Progress.ValueText />
    <Progress.Indicator state="indeterminate" />
    <Progress.Circle>
      <Progress.CircleTrack />
      <Progress.CircleRange />
    </Progress.Circle>
  </Progress.Root>
)

export const ValueText = () => (
  <Progress.Root
    translations={{
      value: ({ value, max }) => (value == null ? 'Loading...' : `${value} of ${max} items loaded`),
    }}
  >
    <Progress.Label>Label</Progress.Label>
    <Progress.ValueText />
    <Progress.Indicator state="indeterminate" />
    <Progress.Circle>
      <Progress.CircleTrack />
      <Progress.CircleRange />
    </Progress.Circle>
  </Progress.Root>
)
