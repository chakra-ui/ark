<script setup lang="ts">
import { SegmentGroup } from '@ark-ui/vue/segment-group'
import { ref } from 'vue'

const frameworks = ref(['React', 'Solid', 'Svelte', 'Vue'])
</script>

<template>
  <SegmentGroup.Root model-value="React">
    <SegmentGroup.Indicator />
    <SegmentGroup.Item v-for="framework in frameworks" :key="framework" :value="framework">
      <SegmentGroup.ItemText>{{ framework }}</SegmentGroup.ItemText>
      <SegmentGroup.ItemControl />
      <SegmentGroup.ItemHiddenInput />
    </SegmentGroup.Item>
  </SegmentGroup.Root>
</template>
