<script setup lang="ts">
import { ref } from 'vue'
import { Splitter, SplitterPanel, SplitterResizeTrigger } from '../'
import { useId } from '../../utils'
import '../splitter.css'

const props = defineProps(['orientation'])

const panelIds = ref([useId().value, useId().value + 1].map((id) => id.replaceAll(':', '-')))
</script>
<template>
  <Story title="Splitter - Basic">
    <Splitter
      v-bind="props"
      :size="[
        { id: panelIds[0], size: 50 },
        { id: panelIds[1], size: 50 },
      ]"
    >
      <SplitterPanel :id="panelIds[0]">
        <p>{{ panelIds[0] }}</p>
      </SplitterPanel>
      <SplitterResizeTrigger :id="`${panelIds[0]}:${panelIds[1]}`">
        <div className="bar" />
      </SplitterResizeTrigger>
      <SplitterPanel :id="panelIds[1]">
        <slot>
          <p>{{ panelIds[1] }}</p>
        </slot>
      </SplitterPanel>
    </Splitter>
  </Story>
</template>
