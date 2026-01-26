import { Tour, useTour, waitForElement, waitForEvent } from '@ark-ui/solid/tour'
import { Portal } from 'solid-js/web'
import { PlusIcon, SparklesIcon, XIcon } from 'lucide-solid'
import { For, createSignal } from 'solid-js'
import button from 'styles/button.module.css'
import styles from 'styles/tour.module.css'

const steps: Tour.StepDetails[] = [
  {
    id: 'intro',
    type: 'dialog',
    title: 'Dynamic Elements',
    description: 'This tour demonstrates waiting for elements that appear dynamically.',
    actions: [{ label: 'Start', action: 'next' }],
  },
  {
    id: 'add-item',
    type: 'tooltip',
    title: 'Add an Item',
    description: 'Click the button to add a new item to the list.',
    target: () => document.querySelector<HTMLElement>('#btn-add-item'),
    effect({ next, target, show }) {
      show()
      const [promise, cancel] = waitForEvent(target, 'click')
      promise.then(() => next())
      return cancel
    },
  },
  {
    id: 'new-item',
    type: 'tooltip',
    title: 'New Item Added!',
    description: 'The tour waited for this element to appear before showing this step.',
    target: () => document.querySelector<HTMLElement>('[data-item="new"]'),
    effect({ show }) {
      const [promise, cancel] = waitForElement(() => document.querySelector<HTMLElement>('[data-item="new"]'), {
        timeout: 5000,
      })
      promise.then(() => show())
      return () => cancel()
    },
    actions: [{ label: 'Next', action: 'next' }],
  },
  {
    id: 'complete',
    type: 'dialog',
    title: 'Tour Complete',
    description: 'You learned how to use waitForElement for dynamic content.',
    actions: [{ label: 'Done', action: 'dismiss' }],
  },
]

export const WaitForElement = () => {
  const tour = useTour({ steps })
  const [items, setItems] = createSignal<string[]>(['Item 1', 'Item 2'])

  const addItem = () => {
    setItems((prev) => [...prev, `Item ${prev.length + 1}`])
  }

  return (
    <div class={styles.Root}>
      <button type="button" data-variant="surface" class={button.Root} onClick={() => tour().start()}>
        <SparklesIcon /> Start Tour
      </button>

      <button id="btn-add-item" type="button" class={button.Root} onClick={addItem}>
        <PlusIcon /> Add Item
      </button>

      <div class={styles.List}>
        <For each={items()}>
          {(item, index) => (
            <div
              class={styles.ListItem}
              data-item={index() === items().length - 1 && items().length > 2 ? 'new' : undefined}
            >
              {item}
            </div>
          )}
        </For>
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
