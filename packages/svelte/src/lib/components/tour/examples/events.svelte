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
      title: 'First Step',
      description: 'Watch the event log below as you navigate.',
      target: () => document.querySelector<HTMLElement>('#event-1'),
      actions: [{ label: 'Next', action: 'next' }],
    },
    {
      id: 'step-2',
      type: 'tooltip',
      title: 'Second Step',
      description: 'Each step change triggers an event.',
      target: () => document.querySelector<HTMLElement>('#event-2'),
      actions: [
        { label: 'Back', action: 'prev' },
        { label: 'Next', action: 'next' },
      ],
    },
    {
      id: 'step-3',
      type: 'tooltip',
      title: 'Final Step',
      description: 'Complete the tour to see the status change.',
      target: () => document.querySelector<HTMLElement>('#event-3'),
      actions: [
        { label: 'Back', action: 'prev' },
        { label: 'Finish', action: 'dismiss' },
      ],
    },
  ]

  let logs = $state<string[]>([])

  const addLog = (message: string) => {
    logs = [...logs, message]
  }

  const tour = useTour({
    steps,
    onStepChange(details) {
      addLog(`Step changed: ${details.stepId}`)
    },
    onStatusChange(details) {
      addLog(`Status: ${details.status}`)
    },
  })
</script>

<div class={styles.Root}>
  <button type="button" data-variant="surface" class={button.Root} onclick={() => tour().start()}>
    <SparklesIcon /> Start Tour
  </button>

  <div class={styles.ActionButtons}>
    <div id="event-1" class={styles.Target}>Step 1</div>
    <div id="event-2" class={styles.Target}>Step 2</div>
    <div id="event-3" class={styles.Target}>Step 3</div>
  </div>

  <div class={styles.EventLog}>
    <strong>Event Log:</strong>
    {#if logs.length === 0}
      <div class={styles.EventLogItem}>Start the tour to see events</div>
    {:else}
      {#each logs as log, i (i)}
        <div class={styles.EventLogItem}>{log}</div>
      {/each}
    {/if}
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
