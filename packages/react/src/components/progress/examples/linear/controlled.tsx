import { Progress } from '@ark-ui/react/progress'
import { useState } from 'react'
import styles from 'styles/progress.module.css'

export const Controlled = () => {
  const [value, setValue] = useState<number | null>(42)

  return (
    <Progress.Root className={styles.Root} value={value} onValueChange={(e) => setValue(e.value)}>
      <Progress.Label className={styles.Label}>Label</Progress.Label>
      <Progress.ValueText className={styles.ValueText} />
      <Progress.Track className={styles.Track}>
        <Progress.Range className={styles.Range} />
      </Progress.Track>
    </Progress.Root>
  )
}
