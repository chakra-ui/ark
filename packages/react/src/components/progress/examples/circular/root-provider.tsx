import { Progress, useProgress } from '@ark-ui/react/progress'
import button from 'styles/button.module.css'
import styles from 'styles/progress-circular.module.css'

export const RootProvider = () => {
  const progress = useProgress()

  return (
    <div className="stack">
      <button className={button.Root} onClick={() => progress.setToMax()}>
        Set to Max
      </button>
      <Progress.RootProvider className={styles.Root} value={progress}>
        <div className={styles.CircleContainer}>
          <Progress.Circle className={styles.Circle}>
            <Progress.CircleTrack className={styles.CircleTrack} />
            <Progress.CircleRange className={styles.CircleRange} />
          </Progress.Circle>
          <Progress.ValueText className={styles.ValueText} />
        </div>
      </Progress.RootProvider>
    </div>
  )
}
