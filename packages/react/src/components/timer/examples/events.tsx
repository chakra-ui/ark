import { Timer } from '@ark-ui/react/timer'
import { PlayIcon, RotateCcwIcon } from 'lucide-react'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/timer.module.css'

export const Events = () => {
  const [ticks, setTicks] = useState(0)

  return (
    <Timer.Root
      className="stack"
      targetMs={60 * 1000}
      onComplete={() => console.log('Timer completed')}
      onTick={() => setTicks((t) => t + 1)}
    >
      <Timer.Area className={styles.Area}>
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
        <Timer.ActionTrigger className={button.Root} action="reset">
          <RotateCcwIcon /> Reset
        </Timer.ActionTrigger>
      </Timer.Control>

      <output>Ticks: {ticks}</output>
    </Timer.Root>
  )
}
