<script lang="ts">
import type { SelectHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DatePickerYearSelectBaseProps extends PolymorphicProps {}
export interface DatePickerYearSelectProps
  extends DatePickerYearSelectBaseProps,
    /**
     * @vue-ignore
     */
    SelectHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

defineProps<DatePickerYearSelectProps>()
const datePicker = useDatePickerContext()

useForwardExpose()
</script>

<template>
  <ark.select v-bind="datePicker.getYearSelectProps()" :as-child="asChild">
    <option v-for="year in datePicker.getYears()" :key="year.value" :value="year.value">
      {{ year.label }}
    </option>
  </ark.select>
</template>
