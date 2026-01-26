<script setup lang="ts">
import { SegmentGroup, useSegmentGroup } from '@ark-ui/vue/segment-group'
import styles from 'styles/segment-group.module.css'

const frameworks = ['React', 'Solid', 'Svelte', 'Vue']

const segmentGroup = useSegmentGroup({ defaultValue: 'React' })
</script>

<template>
  <div class="stack">
    <output>selected: {{ segmentGroup.value }}</output>
    <SegmentGroup.RootProvider :class="styles.Root" :value="segmentGroup">
      <SegmentGroup.Indicator :class="styles.Indicator" />
      <SegmentGroup.Item v-for="framework in frameworks" :key="framework" :class="styles.Item" :value="framework">
        <SegmentGroup.ItemText :class="styles.ItemText">{{ framework }}</SegmentGroup.ItemText>
        <SegmentGroup.ItemControl :class="styles.ItemControl" />
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>
    </SegmentGroup.RootProvider>
  </div>
</template>
