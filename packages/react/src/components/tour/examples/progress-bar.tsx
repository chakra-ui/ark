import { Portal } from '@ark-ui/react/portal'
import { Tour, useTour } from '@ark-ui/react/tour'
import { SparklesIcon, XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/tour.module.css'

const steps: Tour.StepDetails[] = [
  {
    id: 'step-1',
    type: 'tooltip',
    title: 'Progress Tracking',
    description: 'Watch the progress bar at the bottom as you navigate.',
    target: () => document.querySelector<HTMLElement>('#progress-1'),
    actions: [{ label: 'Next', action: 'next' }],
  },
  {
    id: 'step-2',
    type: 'tooltip',
    title: 'Halfway There',
    description: 'The progress bar shows how far along you are.',
    target: () => document.querySelector<HTMLElement>('#progress-2'),
    actions: [
      { label: 'Back', action: 'prev' },
      { label: 'Next', action: 'next' },
    ],
  },
  {
    id: 'step-3',
    type: 'tooltip',
    title: 'Almost Done',
    description: 'One more step to complete the tour.',
    target: () => document.querySelector<HTMLElement>('#progress-3'),
    actions: [
      { label: 'Back', action: 'prev' },
      { label: 'Next', action: 'next' },
    ],
  },
  {
    id: 'step-4',
    type: 'tooltip',
    title: 'Complete!',
    description: 'You have completed all the steps.',
    target: () => document.querySelector<HTMLElement>('#progress-4'),
    actions: [
      { label: 'Back', action: 'prev' },
      { label: 'Finish', action: 'dismiss' },
    ],
  },
]

export const ProgressBar = () => {
  const tour = useTour({ steps })

  return (
    <div className={styles.Root}>
      <button type="button" data-variant="surface" className={button.Root} onClick={() => tour.start()}>
        <SparklesIcon /> Start Tour
      </button>

      <div className={styles.ActionButtons}>
        <div id="progress-1" className={styles.Target}>
          Step 1
        </div>
        <div id="progress-2" className={styles.Target}>
          Step 2
        </div>
        <div id="progress-3" className={styles.Target}>
          Step 3
        </div>
        <div id="progress-4" className={styles.Target}>
          Step 4
        </div>
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
              <div className={styles.ProgressBarBottom}>
                <div className={styles.ProgressFill} style={{ width: `${tour.getProgressPercent()}%` }} />
              </div>
            </Tour.Content>
          </Tour.Positioner>
        </Portal>
      </Tour.Root>
    </div>
  )
}
