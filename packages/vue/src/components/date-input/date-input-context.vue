<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseDateInputContext } from './use-date-input-context.ts'

export interface DateInputContextProps extends SlotsType<{
  default: UnwrapRef<UseDateInputContext>
}> {}
</script>

<script setup lang="ts">
import { useDateInputContext } from './use-date-input-context.ts'

const dateInput = useDateInputContext()

defineSlots<{
  default(dateInput: UnwrapRef<UseDateInputContext>): unknown
}>()
</script>

<template>
  <slot v-bind="dateInput"></slot>
</template>
