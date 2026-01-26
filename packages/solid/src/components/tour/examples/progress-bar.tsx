import { Tour, useTour } from '@ark-ui/solid/tour'
import { Portal } from 'solid-js/web'
import { SparklesIcon, XIcon } from 'lucide-solid'
import { For } from 'solid-js'
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
    <div class={styles.Root}>
      <button type="button" data-variant="surface" class={button.Root} onClick={() => tour().start()}>
        <SparklesIcon /> Start Tour
      </button>

      <div class={styles.ActionButtons}>
        <div id="progress-1" class={styles.Target}>
          Step 1
        </div>
        <div id="progress-2" class={styles.Target}>
          Step 2
        </div>
        <div id="progress-3" class={styles.Target}>
          Step 3
        </div>
        <div id="progress-4" class={styles.Target}>
          Step 4
        </div>
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
              <div class={styles.ProgressBarBottom}>
                <div class={styles.ProgressFill} style={{ width: `${tour().getProgressPercent()}%` }} />
              </div>
            </Tour.Content>
          </Tour.Positioner>
        </Portal>
      </Tour.Root>
    </div>
  )
}
