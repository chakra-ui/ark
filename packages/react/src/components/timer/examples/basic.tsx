import { Timer } from '@ark-ui/react/timer'
import { PauseIcon, PlayIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/timer.module.css'

export const Basic = () => (
  <Timer.Root className="stack" targetMs={60 * 60 * 1000} startMs={40 * 60 * 1000}>
    <Timer.Area className={styles.Area}>
      <div className={styles.ItemGroup}>
        <Timer.Item className={styles.Item} type="days" />
        <span className={styles.ItemLabel}>days</span>
      </div>
      <Timer.Separator className={styles.Separator}>:</Timer.Separator>
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
        <PlayIcon /> Play
      </Timer.ActionTrigger>
      <Timer.ActionTrigger className={button.Root} action="resume">
        <PlayIcon /> Resume
      </Timer.ActionTrigger>
      <Timer.ActionTrigger className={button.Root} action="pause">
        <PauseIcon /> Pause
      </Timer.ActionTrigger>
    </Timer.Control>
  </Timer.Root>
)
