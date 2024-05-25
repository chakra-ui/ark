<script lang="ts">
import type { SelectHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DatePickerMonthSelectProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    SelectHTMLAttributes {}
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
