import { Tour, useTour, waitForEvent } from '@ark-ui/solid/tour'
import { Portal } from 'solid-js/web'
import { SparklesIcon, XIcon } from 'lucide-solid'
import { For } from 'solid-js'
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
    <div class={styles.Root}>
      <button type="button" data-variant="surface" class={button.Root} onClick={() => tour().start()}>
        <SparklesIcon /> Start Interactive Tour
      </button>

      <div class={styles.ActionButtons}>
        <button id="btn-add" type="button" class={button.Root}>
          Add Item
        </button>
        <button id="btn-edit" type="button" class={button.Root}>
          Edit
        </button>
        <button id="btn-delete" type="button" class={button.Root}>
          Delete
        </button>
      </div>

      <Tour.Root tour={tour}>
        <Portal>
          <Tour.Backdrop class={styles.Backdrop} />
          <Tour.Spotlight class={styles.Spotlight} />
          <Tour.Positioner class={styles.Positioner}>
            <Tour.Content class={styles.Content}>
              <Tour.Arrow class={styles.Arrow}>
                <Tour.ArrowTip class={styles.ArrowTip} />
              </Tour.Arrow>
              <Tour.CloseTrigger class={styles.CloseTrigger}>
                <XIcon />
              </Tour.CloseTrigger>
              <Tour.ProgressText class={styles.ProgressText} />
              <Tour.Title class={styles.Title} />
              <Tour.Description class={styles.Description} />
              <Tour.Control class={styles.Control}>
                <Tour.Actions>
                  {(actions) => (
                    <For each={actions()}>
                      {(action) => <Tour.ActionTrigger class={styles.ActionTrigger} action={action} />}
                    </For>
                  )}
                </Tour.Actions>
              </Tour.Control>
            </Tour.Content>
          </Tour.Positioner>
        </Portal>
      </Tour.Root>
    </div>
  )
}
