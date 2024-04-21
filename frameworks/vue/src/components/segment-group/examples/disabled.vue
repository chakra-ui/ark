<script setup lang="ts">
import { ref } from 'vue'
import { SegmentGroup } from '../..'

const frameworks = ref(['React', 'Solid', 'Svelte', 'Vue'])
</script>

<template>
  <SegmentGroup.Root model-value="React">
    <SegmentGroup.Indicator />
    <SegmentGroup.Item
      v-for="framework in frameworks"
      :key="framework"
      :value="framework"
      :disabled="framework === 'Svelte'"
    >
      <SegmentGroup.ItemText>{{ framework }}</SegmentGroup.ItemText>
      <SegmentGroup.ItemControl />
    </SegmentGroup.Item>
  </SegmentGroup.Root>
</template>
