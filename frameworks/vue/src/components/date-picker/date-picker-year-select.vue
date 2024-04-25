<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface DatePickerYearSelectProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

defineProps<DatePickerYearSelectProps>()
const datePicker = useDatePickerContext()

interface YearsRange {
  from: number
  to: number
}

const getYearsRange = (range: YearsRange) => {
  const years: number[] = []
  for (let year = range.from; year <= range.to; year += 1) {
    years.push(year)
  }
  return years
}
</script>

<template>
  <ark.select v-bind="datePicker.yearSelectProps" :as-child="asChild">
    <option v-for="year in getYearsRange({ from: 1_000, to: 4_000 })" :key="year" :value="year">
      {{ year }}
    </option>
  </ark.select>
</template>
