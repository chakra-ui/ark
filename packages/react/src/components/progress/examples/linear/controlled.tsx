import { Progress } from '@ark-ui/react/progress'
import { useState } from 'react'

export const Controlled = () => {
  const [value, setValue] = useState<number | null>(42)

  return (
    <>
      <button onClick={() => setValue((v) => (v != null ? v + 10 : null))}>Increment</button>
      <Progress.Root value={value} onValueChange={(e) => setValue(e.value)}>
        <Progress.Label>Label</Progress.Label>
        <Progress.ValueText />
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    </>
  )
}
