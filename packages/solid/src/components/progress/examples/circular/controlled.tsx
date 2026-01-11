import { Progress } from '@ark-ui/solid/progress'
import { createSignal } from 'solid-js'
import styles from 'styles/progress-circular.module.css'

export const Controlled = () => {
  const [value, setValue] = createSignal<number | null>(42)

  return (
    <Progress.Root class={styles.Root} value={value()} onValueChange={(e) => setValue(e.value)}>
      <div class={styles.CircleContainer}>
        <Progress.Circle class={styles.Circle}>
          <Progress.CircleTrack class={styles.CircleTrack} />
          <Progress.CircleRange class={styles.CircleRange} />
        </Progress.Circle>
        <Progress.ValueText class={styles.ValueText} />
      </div>
    </Progress.Root>
  )
}
