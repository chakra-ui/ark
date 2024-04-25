<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface DatePickerClearTriggerProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

defineProps<DatePickerClearTriggerProps>()
const datePicker = useDatePickerContext()
</script>

<template>
  <ark.button v-bind="datePicker.clearTriggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
