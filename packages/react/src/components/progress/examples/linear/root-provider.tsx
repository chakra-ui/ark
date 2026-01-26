import { Progress, useProgress } from '@ark-ui/react/progress'
import button from 'styles/button.module.css'
import styles from 'styles/progress.module.css'

export const RootProvider = () => {
  const progress = useProgress()

  return (
    <div className="stack">
      <button className={button.Root} onClick={() => progress.setToMax()}>
        Set to Max
      </button>
      <Progress.RootProvider className={styles.Root} value={progress}>
        <Progress.Label className={styles.Label}>Label</Progress.Label>
        <Progress.ValueText className={styles.ValueText} />
        <Progress.Track className={styles.Track}>
          <Progress.Range className={styles.Range} />
        </Progress.Track>
      </Progress.RootProvider>
    </div>
  )
}
