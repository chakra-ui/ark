<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseNumberFlowContext } from './use-number-flow-context.ts'

export interface NumberFlowContextProps extends SlotsType<{
  default: UnwrapRef<UseNumberFlowContext>
}> {}
</script>

<script setup lang="ts">
import { useNumberFlowContext } from './use-number-flow-context.ts'

const numberFlow = useNumberFlowContext()

defineSlots<{
  default(numberFlow: UnwrapRef<UseNumberFlowContext>): unknown
}>()
</script>

<template>
  <slot v-bind="numberFlow"></slot>
</template>
