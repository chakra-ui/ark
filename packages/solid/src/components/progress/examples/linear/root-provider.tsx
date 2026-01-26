import { Progress, useProgress } from '@ark-ui/solid/progress'
import button from 'styles/button.module.css'
import styles from 'styles/progress.module.css'

export const RootProvider = () => {
  const progress = useProgress()

  return (
    <div class="stack">
      <button class={button.Root} onClick={() => progress().setToMax()}>
        Set to Max
      </button>
      <Progress.RootProvider class={styles.Root} value={progress}>
        <Progress.Label class={styles.Label}>Label</Progress.Label>
        <Progress.ValueText class={styles.ValueText} />
        <Progress.Track class={styles.Track}>
          <Progress.Range class={styles.Range} />
        </Progress.Track>
      </Progress.RootProvider>
    </div>
  )
}
