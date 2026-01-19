<script setup lang="ts">
import { type Tour, useTour } from '@ark-ui/vue/tour'
import { SparklesIcon, XIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import button from 'styles/button.module.css'
import styles from 'styles/tour.module.css'

const steps: Tour.StepDetails[] = [
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

const logs = ref<string[]>([])

const addLog = (message: string) => {
  logs.value = [...logs.value, message]
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

<template>
  <div :class="styles.Root">
    <button type="button" data-variant="surface" :class="button.Root" @click="tour.start()">
      <SparklesIcon />
      Start Tour
    </button>

    <div :class="styles.ActionButtons">
      <div id="event-1" :class="styles.Target">Step 1</div>
      <div id="event-2" :class="styles.Target">Step 2</div>
      <div id="event-3" :class="styles.Target">Step 3</div>
    </div>

    <div :class="styles.EventLog">
      <strong>Event Log:</strong>
      <div v-if="logs.length === 0" :class="styles.EventLogItem">Start the tour to see events</div>
      <div v-for="(log, i) in logs" v-else :key="i" :class="styles.EventLogItem">
        {{ log }}
      </div>
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
