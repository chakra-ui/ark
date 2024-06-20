<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseTimePickerContext } from './use-time-picker-context'

export interface TimePickerContextProps
  extends SlotsType<{
    default: UnwrapRef<UseTimePickerContext>
  }> {}
</script>

<script setup lang="ts">
import { useTimePickerContext } from './use-time-picker-context'

const TimePicker = useTimePickerContext()

defineSlots<{
  default(TimePicker: UnwrapRef<UseTimePickerContext>): unknown
}>()
</script>

<template>
  <slot v-bind="TimePicker" />
</template>
