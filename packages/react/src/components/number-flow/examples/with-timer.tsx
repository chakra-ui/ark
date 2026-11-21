import { NumberFlow } from '@ark-ui/react/number-flow'
import { Timer, useTimer } from '@ark-ui/react/timer'
import { PauseIcon, PlayIcon, RotateCcwIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/number-flow.module.css'
import timerStyles from 'styles/timer.module.css'

const formatOptions = { minimumIntegerDigits: 2 }

export const WithTimer = () => {
  const timer = useTimer({ countdown: true, startMs: 5 * 60 * 1000 })

  return (
    <Timer.RootProvider value={timer} className={styles.Card}>
      <span className={styles.Label}>Offer ends in</span>
      <Timer.Area className={`${timerStyles.Area} ${styles.Display}`}>
        <NumberFlow.Root value={timer.time.minutes} formatOptions={formatOptions} trend={-1} className={styles.Root}>
          <NumberFlow.Segments />
        </NumberFlow.Root>
        <Timer.Separator className={timerStyles.Separator}>:</Timer.Separator>
        <NumberFlow.Root value={timer.time.seconds} formatOptions={formatOptions} trend={-1} className={styles.Root}>
          <NumberFlow.Segments />
        </NumberFlow.Root>
      </Timer.Area>
      <Timer.Control className={styles.Actions}>
        <Timer.ActionTrigger className={button.Root} data-variant="solid" action="start">
          <PlayIcon /> Start
        </Timer.ActionTrigger>
        <Timer.ActionTrigger className={button.Root} action="pause">
          <PauseIcon /> Pause
        </Timer.ActionTrigger>
        <Timer.ActionTrigger className={button.Root} action="resume">
          <PlayIcon /> Resume
        </Timer.ActionTrigger>
        <Timer.ActionTrigger className={button.Root} action="reset">
          <RotateCcwIcon /> Reset
        </Timer.ActionTrigger>
      </Timer.Control>
    </Timer.RootProvider>
  )
}
