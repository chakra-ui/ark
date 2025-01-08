import { Progress } from '@ark-ui/react/progress'
import { useState } from 'react'

export const Controlled = () => {
  const [value, setValue] = useState<number | null>(42)

  return (
    <Progress.Root value={value} onValueChange={(e) => setValue(e.value)}>
      <Progress.Label>Label</Progress.Label>
      <Progress.ValueText />
      <Progress.Circle>
        <Progress.CircleTrack />
        <Progress.CircleRange />
      </Progress.Circle>
    </Progress.Root>
  )
}
