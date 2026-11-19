<script setup lang="ts">
import {
  Tour,
  type TourStatusChangeDetails,
  type TourStepChangeDetails,
  type TourStepDetails,
  useTour,
} from '@ark-ui/vue/tour'

const props = withDefaults(
  defineProps<{
    closeOnEscape?: boolean
    onStepChange?: (details: TourStepChangeDetails) => void
    onStatusChange?: (details: TourStatusChangeDetails) => void
  }>(),
  { closeOnEscape: undefined },
)

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

const tour = useTour(() => ({ ...props, steps }))
</script>

<template>
  <button type="button" @click="tour.start()">Start tour</button>
  <button id="save" type="button">Save</button>
  <Tour.Root :tour="tour">
    <Teleport to="body">
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
            <Tour.Actions v-slot="actions">
              <Tour.ActionTrigger v-for="action in actions" :key="action.label" :action="action" />
            </Tour.Actions>
          </Tour.Control>
        </Tour.Content>
      </Tour.Positioner>
    </Teleport>
  </Tour.Root>
</template>
