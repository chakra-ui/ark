import { Timer, useTimer } from '@ark-ui/react/timer'
import { PauseIcon, PlayIcon, RotateCcwIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/timer.module.css'

export const RootProvider = () => {
  const timer = useTimer({ targetMs: 60 * 60 * 1000 })

  return (
    <div className="stack">
      <output>timer: {JSON.stringify(timer.time)}</output>
      <Timer.RootProvider className={styles.Root} value={timer}>
        <Timer.Area className={styles.Area}>
          <div className={styles.ItemGroup}>
            <Timer.Item className={styles.Item} type="hours" />
            <span className={styles.ItemLabel}>hours</span>
          </div>
          <Timer.Separator className={styles.Separator}>:</Timer.Separator>
          <div className={styles.ItemGroup}>
            <Timer.Item className={styles.Item} type="minutes" />
            <span className={styles.ItemLabel}>minutes</span>
          </div>
          <Timer.Separator className={styles.Separator}>:</Timer.Separator>
          <div className={styles.ItemGroup}>
            <Timer.Item className={styles.Item} type="seconds" />
            <span className={styles.ItemLabel}>seconds</span>
          </div>
        </Timer.Area>
        <Timer.Control className="hstack">
          <Timer.ActionTrigger className={button.Root} action="start">
            <PlayIcon /> Start
          </Timer.ActionTrigger>
          <Timer.ActionTrigger className={button.Root} action="resume">
            <PlayIcon /> Resume
          </Timer.ActionTrigger>
          <Timer.ActionTrigger className={button.Root} action="pause">
            <PauseIcon /> Pause
          </Timer.ActionTrigger>
          <Timer.ActionTrigger className={button.Root} action="reset">
            <RotateCcwIcon /> Reset
          </Timer.ActionTrigger>
        </Timer.Control>
      </Timer.RootProvider>
    </div>
  )
}
