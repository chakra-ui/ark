import { Progress } from '@ark-ui/solid/progress'
import styles from 'styles/progress-circular.module.css'

export const WithLabel = () => (
  <Progress.Root class={styles.Root} defaultValue={42}>
    <Progress.Label class={styles.Label}>Label</Progress.Label>
    <div class={styles.CircleContainer}>
      <Progress.Circle class={styles.Circle}>
        <Progress.CircleTrack class={styles.CircleTrack} />
        <Progress.CircleRange class={styles.CircleRange} />
      </Progress.Circle>
      <Progress.ValueText class={styles.ValueText} />
    </div>
  </Progress.Root>
)
