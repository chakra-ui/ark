import { Progress } from '@ark-ui/solid/progress'
import styles from 'styles/progress.module.css'

export const InitialValue = () => (
  <Progress.Root class={styles.Root} defaultValue={70}>
    <Progress.Label class={styles.Label}>Label</Progress.Label>
    <Progress.ValueText class={styles.ValueText} />
    <Progress.Track class={styles.Track}>
      <Progress.Range class={styles.Range} />
    </Progress.Track>
  </Progress.Root>
)
