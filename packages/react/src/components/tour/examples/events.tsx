import { Portal } from '@ark-ui/react/portal'
import { Tour, useTour } from '@ark-ui/react/tour'
import { SparklesIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import button from 'styles/button.module.css'
import styles from 'styles/tour.module.css'

const steps: Tour.StepDetails[] = [
  {
    id: 'step-1',
    type: 'tooltip',
    title: 'First Step',
    description: 'Watch the event log below as you navigate.',
    target: () => document.querySelector<HTMLElement>('#event-1'),
    actions: [{ label: 'Next', action: 'next' }],
  },
  {
    id: 'step-2',
    type: 'tooltip',
    title: 'Second Step',
    description: 'Each step change triggers an event.',
    target: () => document.querySelector<HTMLElement>('#event-2'),
    actions: [
      { label: 'Back', action: 'prev' },
      { label: 'Next', action: 'next' },
    ],
  },
  {
    id: 'step-3',
    type: 'tooltip',
    title: 'Final Step',
    description: 'Complete the tour to see the status change.',
    target: () => document.querySelector<HTMLElement>('#event-3'),
    actions: [
      { label: 'Back', action: 'prev' },
      { label: 'Finish', action: 'dismiss' },
    ],
  },
]

export const Events = () => {
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, message])
  }

  const tour = useTour({
    steps,
    onStepChange(details) {
      addLog(`Step changed: ${details.stepId}`)
    },
    onStatusChange(details) {
      addLog(`Status: ${details.status}`)
    },
  })

  return (
    <div className={styles.Root}>
      <button type="button" data-variant="surface" className={button.Root} onClick={() => tour.start()}>
        <SparklesIcon /> Start Tour
      </button>

      <div className={styles.ActionButtons}>
        <div id="event-1" className={styles.Target}>
          Step 1
        </div>
        <div id="event-2" className={styles.Target}>
          Step 2
        </div>
        <div id="event-3" className={styles.Target}>
          Step 3
        </div>
      </div>

      <div className={styles.EventLog}>
        <strong>Event Log:</strong>
        {logs.length === 0 ? (
          <div className={styles.EventLogItem}>Start the tour to see events</div>
        ) : (
          logs.map((log, i) => (
            <div key={i} className={styles.EventLogItem}>
              {log}
            </div>
          ))
        )}
      </div>

      <Tour.Root tour={tour}>
        <Portal>
          <Tour.Backdrop className={styles.Backdrop} />
          <Tour.Spotlight className={styles.Spotlight} />
          <Tour.Positioner className={styles.Positioner}>
            <Tour.Content className={styles.Content}>
              <Tour.Arrow className={styles.Arrow}>
                <Tour.ArrowTip className={styles.ArrowTip} />
              </Tour.Arrow>
              <Tour.CloseTrigger className={styles.CloseTrigger}>
                <XIcon />
              </Tour.CloseTrigger>
              <Tour.ProgressText className={styles.ProgressText} />
              <Tour.Title className={styles.Title} />
              <Tour.Description className={styles.Description} />
              <Tour.Control className={styles.Control}>
                <Tour.Actions>
                  {(actions) =>
                    actions.map((action) => (
                      <Tour.ActionTrigger className={styles.ActionTrigger} key={action.label} action={action} />
                    ))
                  }
                </Tour.Actions>
              </Tour.Control>
            </Tour.Content>
          </Tour.Positioner>
        </Portal>
      </Tour.Root>
    </div>
  )
}
