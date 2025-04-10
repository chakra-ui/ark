<script setup lang="ts">
import { SegmentGroup, useSegmentGroup } from '@ark-ui/vue/segment-group'
import { ref } from 'vue'

const frameworks = ref(['React', 'Solid', 'Svelte', 'Vue'])

const segmentGroup = useSegmentGroup()
</script>

<template>
  <button @click="segmentGroup.focus()">Focus</button>

  <SegmentGroup.RootProvider :value="segmentGroup">
    <SegmentGroup.Indicator />
    <SegmentGroup.Item v-for="framework in frameworks" :key="framework" :value="framework">
      <SegmentGroup.ItemText>{{ framework }}</SegmentGroup.ItemText>
      <SegmentGroup.ItemControl />
      <SegmentGroup.ItemHiddenInput />
    </SegmentGroup.Item>
  </SegmentGroup.RootProvider>
</template>
