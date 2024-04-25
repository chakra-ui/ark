<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface DatePickerTableCellTriggerProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTableCellPropsContext } from './use-date-picker-table-cell-props-context'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context'

defineProps<DatePickerTableCellTriggerProps>()
const datePicker = useDatePickerContext()
const cellProps = useDatePickerTableCellPropsContext()
const viewProps = useDatePickerViewPropsContext()

const triggerProps = computed(() => {
  return {
    day: datePicker.value.getDayTableCellTriggerProps,
    month: datePicker.value.getMonthTableCellTriggerProps,
    year: datePicker.value.getYearTableCellTriggerProps,
    // @ts-expect-error use filter guard
  }[viewProps.view](cellProps)
})
</script>

<template>
  <ark.button v-bind="triggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
