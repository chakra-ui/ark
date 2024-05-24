<script lang="ts">
import type { TdHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import type { DatePickerTableCellPropsContext } from './use-date-picker-table-cell-props-context'

export interface DatePickerTableCellProps
  extends PolymorphicProps,
    DatePickerTableCellPropsContext,
    /**
     * @vue-ignore
     */
    TdHTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { DatePickerTableCellPropsProvider } from './use-date-picker-table-cell-props-context'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context'

const props = defineProps<DatePickerTableCellProps>()
const datePicker = useDatePickerContext()
const viewProps = useDatePickerViewPropsContext()
DatePickerTableCellPropsProvider(props)

const tableCellProps = computed(() => {
  return {
    day: datePicker.value.getDayTableCellProps,
    month: datePicker.value.getMonthTableCellProps,
    year: datePicker.value.getYearTableCellProps,
    // @ts-expect-error use filter guard
  }[viewProps.view](props)
})
</script>

<template>
  <ark.td v-bind="tableCellProps" :as-child="asChild">
    <slot />
  </ark.td>
</template>
