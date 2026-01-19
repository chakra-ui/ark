<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { Tour, useTour, type TourStepDetails } from '@ark-ui/svelte/tour'
  import { SparklesIcon, XIcon } from 'lucide-svelte'
  import button from 'styles/button.module.css'
  import styles from 'styles/tour.module.css'

  const steps: TourStepDetails[] = [
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

  const tour = useTour({ steps })
</script>

<div class={styles.Root}>
  <button type="button" data-variant="surface" class={button.Root} onclick={() => tour().start()}>
    <SparklesIcon /> Start Tour
  </button>

  <div class={styles.ActionButtons}>
    <div id="item-1" class={styles.Target}>Item 1</div>
    <div id="item-2" class={styles.Target}>Item 2</div>
    <div id="item-3" class={styles.Target}>Item 3</div>
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
