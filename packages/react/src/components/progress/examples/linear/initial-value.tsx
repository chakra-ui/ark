import { Progress } from '@ark-ui/react/progress'

export const InitialValue = () => (
  <Progress.Root defaultValue={70}>
    <Progress.Label>Label</Progress.Label>
    <Progress.ValueText />
    <Progress.Track>
      <Progress.Range />
    </Progress.Track>
  </Progress.Root>
)
