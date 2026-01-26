import { Progress } from '@ark-ui/react/progress'
import { useState } from 'react'
import styles from 'styles/progress-circular.module.css'

export const Controlled = () => {
  const [value, setValue] = useState<number | null>(42)

  return (
    <Progress.Root className={styles.Root} value={value} onValueChange={(e) => setValue(e.value)}>
      <div className={styles.CircleContainer}>
        <Progress.Circle className={styles.Circle}>
          <Progress.CircleTrack className={styles.CircleTrack} />
          <Progress.CircleRange className={styles.CircleRange} />
        </Progress.Circle>
        <Progress.ValueText className={styles.ValueText} />
      </div>
    </Progress.Root>
  )
}
