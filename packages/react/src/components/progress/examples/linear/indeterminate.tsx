import { Progress } from '@ark-ui/react/progress'

export const Indeterminate = () => (
  <Progress.Root value={null}>
    <Progress.Label>Label</Progress.Label>
    <Progress.ValueText />
    <Progress.Track>
      <Progress.Range />
    </Progress.Track>
  </Progress.Root>
)
