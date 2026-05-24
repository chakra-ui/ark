<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseSegmentGroupContext } from './use-segment-group-context.ts'

export interface SegmentGroupContextProps extends SlotsType<{
  default: UnwrapRef<UseSegmentGroupContext>
}> {}
</script>

<script setup lang="ts">
import { useSegmentGroupContext } from './use-segment-group-context.ts'

const segmentGroup = useSegmentGroupContext()

defineSlots<{
  default(segmentGroup: UnwrapRef<UseSegmentGroupContext>): unknown
}>()
</script>

<template>
  <slot v-bind="segmentGroup"></slot>
</template>
