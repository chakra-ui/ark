<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseBottomSheetContext } from './use-bottom-sheet-context'

export interface BottomSheetContextProps
  extends SlotsType<{
    default: UnwrapRef<UseBottomSheetContext>
  }> {}
</script>

<script setup lang="ts">
import { useBottomSheetContext } from './use-bottom-sheet-context'

const bottomSheet = useBottomSheetContext()

defineSlots<{
  default(bottomSheet: UnwrapRef<UseBottomSheetContext>): unknown
}>()
</script>

<template>
  <slot v-bind="bottomSheet"></slot>
</template>
