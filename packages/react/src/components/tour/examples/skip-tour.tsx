import { Portal } from '@ark-ui/react/portal'
import { Tour, useTour } from '@ark-ui/react/tour'
import { SparklesIcon, XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/tour.module.css'

const steps: Tour.StepDetails[] = [
  {
    id: 'step-1',
    type: 'tooltip',
    title: 'First Feature',
    description: 'You can skip this tour at any time using the Skip button.',
    target: () => document.querySelector<HTMLElement>('#item-1'),
    actions: [
      { label: 'Skip', action: 'dismiss' },
      { label: 'Next', action: 'next' },
    ],
  },
  {
    id: 'step-2',
    type: 'tooltip',
    title: 'Second Feature',
    description: 'Continue or skip to end the tour early.',
    target: () => document.querySelector<HTMLElement>('#item-2'),
    actions: [
      { label: 'Skip', action: 'dismiss' },
      { label: 'Back', action: 'prev' },
      { label: 'Next', action: 'next' },
    ],
  },
  {
    id: 'step-3',
    type: 'tooltip',
    title: 'Final Feature',
    description: 'This is the last step of the tour.',
    target: () => document.querySelector<HTMLElement>('#item-3'),
    actions: [
      { label: 'Back', action: 'prev' },
      { label: 'Finish', action: 'dismiss' },
    ],
  },
]

export const SkipTour = () => {
  const tour = useTour({ steps })

  return (
    <div className={styles.Root}>
      <button type="button" data-variant="surface" className={button.Root} onClick={() => tour.start()}>
        <SparklesIcon /> Start Tour
      </button>

      <div className={styles.ActionButtons}>
        <div id="item-1" className={styles.Target}>
          Item 1
        </div>
        <div id="item-2" className={styles.Target}>
          Item 2
        </div>
        <div id="item-3" className={styles.Target}>
          Item 3
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
