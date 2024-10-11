<script setup lang="ts">
import { SegmentGroup } from '@ark-ui/vue/segment-group'
import { ref } from 'vue'

const frameworks = ref(['React', 'Solid', 'Svelte', 'Vue'])
const value = ref('React')
</script>

<template>
  <SegmentGroup.Root v-model="value">
    <SegmentGroup.Indicator />
    <SegmentGroup.Item v-for="framework in frameworks" :key="framework" :value="framework">
      <SegmentGroup.ItemText>{{ framework }}</SegmentGroup.ItemText>
      <SegmentGroup.ItemControl />
      <SegmentGroup.ItemHiddenInput />
    </SegmentGroup.Item>
  </SegmentGroup.Root>
</template>
