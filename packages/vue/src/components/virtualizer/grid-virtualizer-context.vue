<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseGridVirtualizerContext } from './use-grid-virtualizer-context.ts'

export interface GridVirtualizerContextProps extends SlotsType<{
  default: { context: UnwrapRef<UseGridVirtualizerContext> }
}> {}
</script>

<script setup lang="ts">
import { useGridVirtualizerContext } from './use-grid-virtualizer-context.ts'

const virtualizer = useGridVirtualizerContext()

defineSlots<{
  default(props: { context: UnwrapRef<UseGridVirtualizerContext> }): unknown
}>()
</script>

<template>
  <slot :context="virtualizer"></slot>
</template>
