<script setup lang="ts">
import { Tour, useTour } from '@ark-ui/vue/tour'
import { XIcon } from 'lucide-vue-next'
import { onMounted } from 'vue'
import { steps } from './steps'

const tour = useTour({ steps })

onMounted(() => {
  tour.value.start()
})
</script>

<template>
  <Tour.Root :tour="tour">
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
          <Tour.Actions v-slot="actions">
            <Tour.ActionTrigger v-for="action in actions" :key="action.label" :action="action" />
          </Tour.Actions>
        </Tour.Control>
      </Tour.Content>
    </Tour.Positioner>
  </Tour.Root>
</template>
