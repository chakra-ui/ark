import { Progress } from '@ark-ui/solid/progress'
import styles from 'styles/progress-circular.module.css'

export const Indeterminate = () => (
  <Progress.Root class={styles.Root} defaultValue={null}>
    <div class={styles.CircleContainer}>
      <Progress.Circle class={styles.Circle}>
        <Progress.CircleTrack class={styles.CircleTrack} />
        <Progress.CircleRange class={styles.CircleRange} />
      </Progress.Circle>
      <Progress.ValueText class={styles.ValueText} />
    </div>
  </Progress.Root>
)
