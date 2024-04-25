<script lang="ts">
import type { SlotsType, UnwrapRef } from 'vue'
import type { UseDatePickerContext } from './use-date-picker-context'

export interface DatePickerContextProps
  extends SlotsType<{
    default: UnwrapRef<UseDatePickerContext>
  }> {}
</script>

<script setup lang="ts">
import { useDatePickerContext } from './use-date-picker-context'

const datePicker = useDatePickerContext()

defineSlots<{
  default(datePicker: UnwrapRef<UseDatePickerContext>): unknown
}>()
</script>

<template>
  <slot v-bind="datePicker"></slot>
</template>
