<script setup lang="ts">
import { SegmentGroup } from '@ark-ui/vue/segment-group'
import { ref } from 'vue'
import styles from 'styles/segment-group.module.css'

const frameworks = ['React', 'Solid', 'Svelte', 'Vue']
const value = ref<string | null>(null)
</script>

<template>
  <SegmentGroup.Root :class="styles.Root" v-model="value">
    <SegmentGroup.Indicator :class="styles.Indicator" />
    <SegmentGroup.Item v-for="framework in frameworks" :key="framework" :class="styles.Item" :value="framework">
      <SegmentGroup.ItemText :class="styles.ItemText">{{ framework }}</SegmentGroup.ItemText>
      <SegmentGroup.ItemControl :class="styles.ItemControl" />
      <SegmentGroup.ItemHiddenInput />
    </SegmentGroup.Item>
  </SegmentGroup.Root>
</template>
