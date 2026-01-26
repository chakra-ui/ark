import { Progress } from '@ark-ui/solid/progress'
import { createSignal } from 'solid-js'
import styles from 'styles/progress.module.css'

export const Controlled = () => {
  const [value, setValue] = createSignal<number | null>(42)

  return (
    <Progress.Root class={styles.Root} value={value()} onValueChange={(e) => setValue(e.value)}>
      <Progress.Label class={styles.Label}>Label</Progress.Label>
      <Progress.ValueText class={styles.ValueText} />
      <Progress.Track class={styles.Track}>
        <Progress.Range class={styles.Range} />
      </Progress.Track>
    </Progress.Root>
  )
}
