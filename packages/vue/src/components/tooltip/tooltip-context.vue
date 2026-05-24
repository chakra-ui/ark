<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseTooltipContext } from './use-tooltip-context.ts'

export interface TooltipContextProps extends SlotsType<{
  default: UnwrapRef<UseTooltipContext>
}> {}
</script>

<script setup lang="ts">
import { useTooltipContext } from './use-tooltip-context.ts'

const tooltip = useTooltipContext()

defineSlots<{
  default(tooltip: UnwrapRef<UseTooltipContext>): unknown
}>()
</script>

<template>
  <slot v-bind="tooltip"></slot>
</template>
