<script lang="ts">
import type { Segment } from '@zag-js/number-flow'
import type { SlotsType } from 'vue'

export interface NumberFlowSegmentsProps extends SlotsType<{
  default: { segment: Segment }
}> {}
</script>

<script setup lang="ts">
import NumberFlowDigit from './number-flow-digit.vue'
import NumberFlowSymbol from './number-flow-symbol.vue'
import { useNumberFlowContext } from './use-number-flow-context.ts'

const numberFlow = useNumberFlowContext()

defineSlots<{
  default?(props: { segment: Segment }): unknown
}>()
</script>

<template>
  <template v-for="segment in numberFlow.segments" :key="segment.key">
    <slot :segment="segment">
      <NumberFlowDigit v-if="segment.kind === 'digit'" :segment="segment" />
      <NumberFlowSymbol v-else :segment="segment" />
    </slot>
  </template>
</template>
