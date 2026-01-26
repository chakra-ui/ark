import { Portal } from '@ark-ui/react/portal'
import { Tour, useTour } from '@ark-ui/react/tour'
import { KeyboardIcon, SparklesIcon, XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/tour.module.css'

const steps: Tour.StepDetails[] = [
  {
    id: 'step-1',
    type: 'tooltip',
    title: 'Keyboard Navigation',
    description: 'Press the right arrow key (→) to go to the next step.',
    target: () => document.querySelector<HTMLElement>('#key-1'),
    actions: [{ label: 'Next', action: 'next' }],
  },
  {
    id: 'step-2',
    type: 'tooltip',
    title: 'Go Back',
    description: 'Press the left arrow key (←) to go back.',
    target: () => document.querySelector<HTMLElement>('#key-2'),
    actions: [
      { label: 'Back', action: 'prev' },
      { label: 'Next', action: 'next' },
    ],
  },
  {
    id: 'step-3',
    type: 'tooltip',
    title: 'Close Tour',
    description: 'Press Escape to close the tour at any time.',
    target: () => document.querySelector<HTMLElement>('#key-3'),
    actions: [
      { label: 'Back', action: 'prev' },
      { label: 'Finish', action: 'dismiss' },
    ],
  },
]

export const KeyboardNavigation = () => {
  const tour = useTour({ steps, keyboardNavigation: true })

  return (
    <div className={styles.Root}>
      <button type="button" data-variant="surface" className={button.Root} onClick={() => tour.start()}>
        <SparklesIcon /> Start Tour
      </button>

      <p className={styles.Hint}>
        <KeyboardIcon /> Use arrow keys to navigate, Escape to close
      </p>

      <div className={styles.ActionButtons}>
        <div id="key-1" className={styles.Target}>
          Step 1
        </div>
        <div id="key-2" className={styles.Target}>
          Step 2
        </div>
        <div id="key-3" className={styles.Target}>
          Step 3
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
            </Tour.Content>
          </Tour.Positioner>
        </Portal>
      </Tour.Root>
    </div>
  )
}
