<script setup lang="ts">
import { ref } from 'vue'
import { SegmentGroup } from '../..'

const frameworks = ref(['React', 'Solid', 'Svelte', 'Vue'])
</script>

<template>
  <SegmentGroup.Root>
    <SegmentGroup.Indicator />
    <SegmentGroup.Item v-for="framework in frameworks" :key="framework" :value="framework">
      <SegmentGroup.ItemText>{{ framework }}</SegmentGroup.ItemText>
      <SegmentGroup.ItemControl />
      <SegmentGroup.ItemHiddenInput />
    </SegmentGroup.Item>
  </SegmentGroup.Root>
</template>
