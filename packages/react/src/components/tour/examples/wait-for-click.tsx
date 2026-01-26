import { Portal } from '@ark-ui/react/portal'
import { Tour, useTour, waitForEvent } from '@ark-ui/react/tour'
import { SparklesIcon, XIcon } from 'lucide-react'
import button from 'styles/button.module.css'
import styles from 'styles/tour.module.css'

const steps: Tour.StepDetails[] = [
  {
    id: 'intro',
    type: 'dialog',
    title: 'Interactive Tutorial',
    description: 'This tour will guide you through actions. You must complete each step to proceed.',
    actions: [{ label: 'Begin', action: 'next' }],
  },
  {
    id: 'click-add',
    type: 'tooltip',
    title: 'Click the Add Button',
    description: 'Click the "Add Item" button to continue.',
    target: () => document.querySelector<HTMLElement>('#btn-add'),
    effect({ next, target, show }) {
      show()
      const [promise, cancel] = waitForEvent(target, 'click')
      promise.then(() => next())
      return cancel
    },
  },
  {
    id: 'click-edit',
    type: 'tooltip',
    title: 'Click the Edit Button',
    description: 'Now click the "Edit" button.',
    target: () => document.querySelector<HTMLElement>('#btn-edit'),
    effect({ next, target, show }) {
      show()
      const [promise, cancel] = waitForEvent(target, 'click')
      promise.then(() => next())
      return cancel
    },
  },
  {
    id: 'click-delete',
    type: 'tooltip',
    title: 'Click the Delete Button',
    description: 'Finally, click the "Delete" button.',
    target: () => document.querySelector<HTMLElement>('#btn-delete'),
    effect({ next, target, show }) {
      show()
      const [promise, cancel] = waitForEvent(target, 'click')
      promise.then(() => next())
      return cancel
    },
  },
  {
    id: 'complete',
    type: 'dialog',
    title: 'Well Done!',
    description: 'You completed all the interactive steps.',
    actions: [{ label: 'Finish', action: 'dismiss' }],
  },
]

export const WaitForClick = () => {
  const tour = useTour({ steps })

  return (
    <div className={styles.Root}>
      <button type="button" data-variant="surface" className={button.Root} onClick={() => tour.start()}>
        <SparklesIcon /> Start Interactive Tour
      </button>

      <div className={styles.ActionButtons}>
        <button id="btn-add" type="button" className={button.Root}>
          Add Item
        </button>
        <button id="btn-edit" type="button" className={button.Root}>
          Edit
        </button>
        <button id="btn-delete" type="button" className={button.Root}>
          Delete
        </button>
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
