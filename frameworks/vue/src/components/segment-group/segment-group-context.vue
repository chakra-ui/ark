<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseSegmentGroupContext } from './use-segment-group-context'

export interface SegmentGroupContextProps
  extends SlotsType<{
    default: UnwrapRef<UseSegmentGroupContext>
  }> {}
</script>

<script setup lang="ts">
import { useSegmentGroupContext } from './use-segment-group-context'

const segmentGroup = useSegmentGroupContext()

defineSlots<{
  default(segmentGroup: UnwrapRef<UseSegmentGroupContext>): unknown
}>()
</script>

<template>
  <slot v-bind="segmentGroup"></slot>
</template>
