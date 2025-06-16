<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal'
  import { Tour, useTour, type TourStepDetails } from '@ark-ui/svelte/tour'
  import { XIcon } from 'lucide-svelte'

  const steps: TourStepDetails[] = [
    {
      type: 'dialog',
      id: 'step-0',
      title: 'Welcome to the tour!',
      description: 'This is a centered tour step without a target element.',
      actions: [{ label: 'Next', action: 'next' }],
    },
    {
      type: 'tooltip',
      id: 'step-1',
      title: 'Button Element',
      description: 'This is our primary button element that users interact with.',
      target: () => document.getElementById('step-1'),
      actions: [
        { label: 'Previous', action: 'prev' },
        { label: 'Next', action: 'next' },
      ],
    },
    {
      type: 'tooltip',
      id: 'step-2',
      title: 'Input Field',
      description: 'Users can enter text in this input field.',
      target: () => document.getElementById('step-2'),
      actions: [
        { label: 'Previous', action: 'prev' },
        { label: 'Finish', action: 'dismiss' },
      ],
    },
  ]

  const id = $props.id()
  const tour = useTour({ steps, id })
</script>

<div class="tour-example">
  <h2>Tour Example</h2>
  <p>This example demonstrates the tour component functionality.</p>

  <div class="demo-content">
    <button id="step-1" class="btn">Click me!</button>
    <input id="step-2" class="input" placeholder="Enter text here..." />
  </div>

  <button onclick={() => tour().start()} class="start-tour-btn">Start Tour</button>

  <Tour.Root {tour}>
    <Portal>
      <Tour.Backdrop />
      <Tour.Spotlight />
      <Tour.Positioner>
        <Tour.Content>
          <Tour.Arrow>
            <Tour.ArrowTip />
          </Tour.Arrow>
          <Tour.Title />
          <Tour.Description />
          <Tour.ProgressText />
          <Tour.CloseTrigger>
            <XIcon />
          </Tour.CloseTrigger>
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
</div>
