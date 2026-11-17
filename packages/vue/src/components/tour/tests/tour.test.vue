<script setup lang="ts">
import {
  Tour,
  type TourStatusChangeDetails,
  type TourStepChangeDetails,
  type TourStepDetails,
  useTour,
} from '@ark-ui/vue/tour'

const props = defineProps<{
  onStatusChange: (details: TourStatusChangeDetails) => void
  onStepChange: (details: TourStepChangeDetails) => void
}>()

const steps: TourStepDetails[] = [
  { id: 'one', type: 'dialog', title: 'One', description: 'First', actions: [{ label: 'Next', action: 'next' }] },
  { id: 'two', type: 'dialog', title: 'Two', description: 'Second', actions: [{ label: 'Finish', action: 'dismiss' }] },
]

const tour = useTour({
  steps,
  onStatusChange: (details) => props.onStatusChange(details),
  onStepChange: (details) => props.onStepChange(details),
})
</script>

<template>
  <button type="button" @click="tour.start()">Start</button>
  <button type="button" @click="tour.next()">Next step</button>
  <Tour.Root :tour="tour">
    <Tour.Positioner>
      <Tour.Content>
        <Tour.Title />
        <Tour.Actions v-slot="actions">
          <Tour.ActionTrigger v-for="action in actions" :key="action.label" :action="action" />
        </Tour.Actions>
      </Tour.Content>
    </Tour.Positioner>
  </Tour.Root>
</template>
