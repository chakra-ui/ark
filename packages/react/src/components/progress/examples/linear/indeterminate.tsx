import { Progress } from '@ark-ui/react/progress'
import styles from 'styles/progress.module.css'

export const Indeterminate = () => (
  <Progress.Root className={styles.Root} defaultValue={null}>
    <Progress.Label className={styles.Label}>Label</Progress.Label>
    <Progress.ValueText className={styles.ValueText} />
    <Progress.Track className={styles.Track}>
      <Progress.Range className={styles.Range} />
    </Progress.Track>
  </Progress.Root>
)
