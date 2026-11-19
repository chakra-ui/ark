<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { Tour, type TourStepDetails, type UseTourProps, useTour } from '@ark-ui/svelte/tour'

  const props: Omit<UseTourProps, 'id' | 'steps'> = $props()

  const steps: TourStepDetails[] = [
    {
      id: 'welcome',
      type: 'dialog',
      title: 'Welcome',
      description: 'Take a quick tour',
      actions: [{ label: 'Next', action: 'next' }],
    },
    {
      id: 'save',
      type: 'tooltip',
      title: 'Save your work',
      description: 'Click here to save',
      target: () => document.querySelector<HTMLElement>('#save'),
      actions: [
        { label: 'Back', action: 'previous' },
        { label: 'Next', action: 'next' },
      ],
    },
    {
      id: 'done',
      type: 'dialog',
      title: 'All set',
      description: 'Enjoy the app',
      actions: [{ label: 'Finish', action: 'dismiss' }],
    },
  ]

  const id = $props.id()
  const tour = useTour(() => ({ ...props, id, steps }))
</script>

<button type="button" onclick={() => tour().start()}>Start tour</button>
<button id="save" type="button">Save</button>

<Tour.Root {tour}>
  <Portal>
    <Tour.Backdrop data-testid="backdrop" />
    <Tour.Spotlight data-testid="spotlight" />
    <Tour.Positioner data-testid="positioner">
      <Tour.Content>
        <Tour.Arrow>
          <Tour.ArrowTip />
        </Tour.Arrow>
        <Tour.CloseTrigger>Close tour</Tour.CloseTrigger>
        <Tour.ProgressText data-testid="progress" />
        <Tour.Title />
        <Tour.Description />
        <Tour.Control>
          <Tour.Actions>
            {#snippet children(actions)}
              {#each actions() as action (action.label)}
                <Tour.ActionTrigger {action} />
              {/each}
            {/snippet}
          </Tour.Actions>
        </Tour.Control>
      </Tour.Content>
    </Tour.Positioner>
  </Portal>
</Tour.Root>
