import { Progress } from '@ark-ui/solid/progress'

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
    <Progress.Track>
      <Progress.Range />
    </Progress.Track>
  </Progress.Root>
)
