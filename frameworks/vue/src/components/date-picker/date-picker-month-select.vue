<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface DatePickerMonthSelectProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

defineProps<DatePickerMonthSelectProps>()
const datePicker = useDatePickerContext()
</script>

<template>
  <ark.select v-bind="datePicker.monthSelectProps" :as-child="asChild">
    <option v-for="month in datePicker.getMonths()" :key="month.value" :value="month.value">
      {{ month.label }}
    </option>
  </ark.select>
</template>
