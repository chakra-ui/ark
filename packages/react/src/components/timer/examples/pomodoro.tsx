import { Timer } from '@ark-ui/react/timer'
import { PauseIcon, PlayIcon, RotateCcwIcon } from 'lucide-react'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/timer.module.css'

export const Pomodoro = () => {
  const [isWorking, setIsWorking] = useState(true)
  const [cycles, setCycles] = useState(0)

  const handleComplete = () => {
    setIsWorking(!isWorking)
    if (!isWorking) setCycles((c) => c + 1)
  }

  return (
    <Timer.Root
      className="stack"
      startMs={isWorking ? 25 * 60 * 1000 : 5 * 60 * 1000}
      countdown
      onComplete={handleComplete}
    >
      <h2>{isWorking ? 'Work Session' : 'Break Session'}</h2>

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
        <Timer.ActionTrigger className={button.Root} action="pause">
          <PauseIcon /> Pause
        </Timer.ActionTrigger>
        <Timer.ActionTrigger className={button.Root} action="reset">
          <RotateCcwIcon /> Reset
        </Timer.ActionTrigger>
      </Timer.Control>

      <output>Completed cycles: {cycles}</output>
    </Timer.Root>
  )
}
