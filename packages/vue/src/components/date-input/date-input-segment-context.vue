<script lang="ts">
import type { DateSegment } from '@zag-js/date-input'

export type DateInputSegmentContextProps = {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useDateInputContext } from './use-date-input-context'
import { useDateInputSegmentGroupPropsContext } from './use-date-input-segment-group-props-context'

const dateInput = useDateInputContext()
const segmentGroupProps = useDateInputSegmentGroupPropsContext()

const keyedSegments = computed(() =>
  dateInput.value.getSegments(segmentGroupProps!.value).map((segment, index) => ({
    ...segment,
    key: `${segment.type}-${index}`,
  })),
)

defineSlots<{
  default(segment: DateSegment): unknown
}>()
</script>

<template>
  <template v-for="segment in keyedSegments" :key="segment.key">
    <slot v-bind="segment" />
  </template>
</template>
