<script setup lang="ts">
import { type Tour, useTour } from '@ark-ui/vue/tour'
import { KeyboardIcon, SparklesIcon, XIcon } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/tour.module.css'

const steps: Tour.StepDetails[] = [
  {
    id: 'step-1',
    type: 'tooltip',
    title: 'Keyboard Navigation',
    description: 'Press the right arrow key to go to the next step.',
    target: () => document.querySelector<HTMLElement>('#key-1'),
    actions: [{ label: 'Next', action: 'next' }],
  },
  {
    id: 'step-2',
    type: 'tooltip',
    title: 'Go Back',
    description: 'Press the left arrow key to go back.',
    target: () => document.querySelector<HTMLElement>('#key-2'),
    actions: [
      { label: 'Back', action: 'prev' },
      { label: 'Next', action: 'next' },
    ],
  },
  {
    id: 'step-3',
    type: 'tooltip',
    title: 'Close Tour',
    description: 'Press Escape to close the tour at any time.',
    target: () => document.querySelector<HTMLElement>('#key-3'),
    actions: [
      { label: 'Back', action: 'prev' },
      { label: 'Finish', action: 'dismiss' },
    ],
  },
]

const tour = useTour({ steps, keyboardNavigation: true })
</script>

<template>
  <div :class="styles.Root">
    <button type="button" data-variant="surface" :class="button.Root" @click="tour.start()">
      <SparklesIcon />
      Start Tour
    </button>

    <p :class="styles.Hint">
      <KeyboardIcon />
      Use arrow keys to navigate, Escape to close
    </p>

    <div :class="styles.ActionButtons">
      <div id="key-1" :class="styles.Target">Step 1</div>
      <div id="key-2" :class="styles.Target">Step 2</div>
      <div id="key-3" :class="styles.Target">Step 3</div>
    </div>

    <Tour.Root :tour="tour">
      <Teleport to="body">
        <Tour.Backdrop :class="styles.Backdrop" />
        <Tour.Spotlight :class="styles.Spotlight" />
        <Tour.Positioner :class="styles.Positioner">
          <Tour.Content :class="styles.Content">
            <Tour.Arrow :class="styles.Arrow">
              <Tour.ArrowTip :class="styles.ArrowTip" />
            </Tour.Arrow>
            <Tour.CloseTrigger :class="styles.CloseTrigger">
              <XIcon />
            </Tour.CloseTrigger>
            <Tour.ProgressText :class="styles.ProgressText" />
            <Tour.Title :class="styles.Title" />
            <Tour.Description :class="styles.Description" />
            <Tour.Control :class="styles.Control">
              <Tour.Actions v-slot="actions">
                <Tour.ActionTrigger
                  v-for="action in actions"
                  :key="action.label"
                  :class="styles.ActionTrigger"
                  :action="action"
                />
              </Tour.Actions>
            </Tour.Control>
          </Tour.Content>
        </Tour.Positioner>
      </Teleport>
    </Tour.Root>
  </div>
</template>
