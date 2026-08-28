<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseNumberInputContext } from './use-number-input-context.ts'

export interface NumberInputContextProps extends SlotsType<{
  default: UnwrapRef<UseNumberInputContext>
}> {}
</script>

<script setup lang="ts">
import { useNumberInputContext } from './use-number-input-context.ts'

const numberInput = useNumberInputContext()

defineSlots<{
  default(numberInput: UnwrapRef<UseNumberInputContext>): unknown
}>()
</script>

<template>
  <slot v-bind="numberInput"></slot>
</template>
