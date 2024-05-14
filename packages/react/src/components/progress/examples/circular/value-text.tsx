import { Progress } from '../..'

export const ValueText = () => (
  <Progress.Root
    translations={{
      value({ value, max }) {
        if (value === null) return 'Loading...'
        return `${value} of ${max} items loaded`
      },
    }}
  >
    <Progress.Label>Label</Progress.Label>
    <Progress.ValueText />
    <Progress.Circle>
      <Progress.CircleTrack />
      <Progress.CircleRange />
    </Progress.Circle>
  </Progress.Root>
)
