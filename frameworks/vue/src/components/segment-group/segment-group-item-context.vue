<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseSegmentGroupItemContext } from './use-segment-group-item-context'

export interface SegmentGroupItemContextProps
  extends SlotsType<{
    default: UnwrapRef<UseSegmentGroupItemContext>
  }> {}
</script>

<script setup lang="ts">
import { useSegmentGroupItemContext } from './use-segment-group-item-context'

const item = useSegmentGroupItemContext()

defineSlots<{
  default(item: UnwrapRef<UseSegmentGroupItemContext>): unknown
}>()
</script>

<template>
  <slot v-bind="item"></slot>
</template>
