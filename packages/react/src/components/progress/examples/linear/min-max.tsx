import { Progress } from '@ark-ui/react/progress'

export const MinMax = () => (
  <Progress.Root defaultValue={20} min={10} max={30}>
    <Progress.Label>Label</Progress.Label>
    <Progress.ValueText />
    <Progress.Track>
      <Progress.Range />
    </Progress.Track>
  </Progress.Root>
)
