import { Progress } from '@ark-ui/react/progress'
import styles from 'styles/progress-circular.module.css'

export const Indeterminate = () => (
  <Progress.Root className={styles.Root} defaultValue={null}>
    <div className={styles.CircleContainer}>
      <Progress.Circle className={styles.Circle}>
        <Progress.CircleTrack className={styles.CircleTrack} />
        <Progress.CircleRange className={styles.CircleRange} />
      </Progress.Circle>
      <Progress.ValueText className={styles.ValueText} />
    </div>
  </Progress.Root>
)
