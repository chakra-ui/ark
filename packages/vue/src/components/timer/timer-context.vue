<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseTimerContext } from './use-timer-context.ts'

export interface TimerContextProps extends SlotsType<{
  default: UnwrapRef<UseTimerContext>
}> {}
</script>

<script setup lang="ts">
import { useTimerContext } from './use-timer-context.ts'

const timer = useTimerContext()

defineSlots<{
  default(timer: UnwrapRef<UseTimerContext>): unknown
}>()
</script>

<template>
  <slot v-bind="timer"></slot>
</template>
