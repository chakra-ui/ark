<script setup lang="ts">
import { type Tour, useTour } from '@ark-ui/vue/tour'
import { SparklesIcon, XIcon } from 'lucide-vue-next'
import button from 'styles/button.module.css'
import styles from 'styles/tour.module.css'

const steps: Tour.StepDetails[] = [
  {
    id: 'welcome',
    type: 'dialog',
    title: 'Welcome!',
    description: 'This tour demonstrates different step types: dialog, tooltip, and floating.',
    actions: [{ label: 'Start Tour', action: 'next' }],
  },
  {
    id: 'tooltip-step',
    type: 'tooltip',
    title: 'Tooltip Step',
    description: 'This step appears as a tooltip anchored to a specific element.',
    target: () => document.querySelector<HTMLElement>('#target-element'),
    actions: [
      { label: 'Back', action: 'prev' },
      { label: 'Next', action: 'next' },
    ],
  },
  {
    id: 'floating-step',
    type: 'floating',
    placement: 'bottom-end',
    title: 'Floating Step',
    description: 'This step floats at a fixed position on the screen, independent of any target.',
    actions: [
      { label: 'Back', action: 'prev' },
      { label: 'Next', action: 'next' },
    ],
  },
  {
    id: 'complete',
    type: 'dialog',
    title: 'Tour Complete!',
    description: 'You have seen all the different step types available.',
    actions: [{ label: 'Done', action: 'dismiss' }],
  },
]

const tour = useTour({ steps })
</script>

<template>
  <div :class="styles.Root">
    <button type="button" data-variant="surface" :class="button.Root" @click="tour.start()">
      <SparklesIcon />
      Start Tour
    </button>

    <div id="target-element" :class="styles.Target">Target Element</div>

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
