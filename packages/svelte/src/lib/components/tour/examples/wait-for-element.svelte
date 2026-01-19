<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { Tour, useTour, waitForEvent, type TourStepDetails } from '@ark-ui/svelte/tour'
  import { waitForElement } from '@zag-js/tour'
  import { PlusIcon, SparklesIcon, XIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/tour.module.css'

  const steps: TourStepDetails[] = [
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

  let items = $state<string[]>(['Item 1', 'Item 2'])

  const addItem = () => {
    items = [...items, `Item ${items.length + 1}`]
  }

  const tour = useTour({ steps })
</script>

<div class={styles.Root}>
  <button type="button" data-variant="surface" class={button.Root} onclick={() => tour().start()}>
    <SparklesIcon /> Start Tour
  </button>

  <button id="btn-add-item" type="button" class={button.Root} onclick={addItem}>
    <PlusIcon /> Add Item
  </button>

  <div class={styles.List}>
    {#each items as item, index (item)}
      <div class={styles.ListItem} data-item={index === items.length - 1 && items.length > 2 ? 'new' : undefined}>
        {item}
      </div>
    {/each}
  </div>

  <Tour.Root {tour}>
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
              {#snippet children(actions)}
                {#each actions() as action (action.label)}
                  <Tour.ActionTrigger class={styles.ActionTrigger} {action} />
                {/each}
              {/snippet}
            </Tour.Actions>
          </Tour.Control>
        </Tour.Content>
      </Tour.Positioner>
    </Portal>
  </Tour.Root>
</div>
