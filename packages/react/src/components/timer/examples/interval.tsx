import { Timer } from '@ark-ui/react/timer'
import { PauseIcon, PlayIcon, RotateCcwIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/timer.module.css'

export const Interval = () => (
  <Timer.Root className="stack" interval={100} targetMs={60 * 1000}>
    <Timer.Area className={styles.Area}>
      <div className={styles.ItemGroup}>
        <Timer.Item className={styles.Item} type="seconds" />
        <span className={styles.ItemLabel}>seconds</span>
      </div>
      <Timer.Separator className={styles.Separator}>.</Timer.Separator>
      <div className={styles.ItemGroup}>
        <Timer.Item className={styles.Item} type="milliseconds" />
        <span className={styles.ItemLabel}>ms</span>
      </div>
    </Timer.Area>
    <Timer.Control className="hstack">
      <Timer.ActionTrigger className={button.Root} action="start">
        <PlayIcon /> Start
      </Timer.ActionTrigger>
      <Timer.ActionTrigger className={button.Root} action="pause">
        <PauseIcon /> Pause
      </Timer.ActionTrigger>
      <Timer.ActionTrigger className={button.Root} action="reset">
        <RotateCcwIcon /> Reset
      </Timer.ActionTrigger>
    </Timer.Control>
  </Timer.Root>
)
