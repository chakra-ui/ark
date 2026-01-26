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
    <div class={styles.Root}>
      <button type="button" data-variant="surface" class={button.Root} onClick={() => tour().start()}>
        <SparklesIcon /> Start Tour
      </button>

      <div class={styles.ActionButtons}>
        <div id="item-1" class={styles.Target}>
          Item 1
        </div>
        <div id="item-2" class={styles.Target}>
          Item 2
        </div>
        <div id="item-3" class={styles.Target}>
          Item 3
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
            </Tour.Content>
          </Tour.Positioner>
        </Portal>
      </Tour.Root>
    </div>
  )
}
