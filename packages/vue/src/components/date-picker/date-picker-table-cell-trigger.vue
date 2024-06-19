<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DatePickerTableCellTriggerBaseProps extends PolymorphicProps {}
export interface DatePickerTableCellTriggerProps
  extends DatePickerTableCellTriggerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
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
  const viewMap = {
    day: datePicker.value.getDayTableCellTriggerProps,
    month: datePicker.value.getMonthTableCellTriggerProps,
    year: datePicker.value.getYearTableCellTriggerProps,
  }

  const viewFn = viewMap[viewProps.view]

  // @ts-expect-error fix later
  return viewFn(cellProps)
})
</script>

<template>
  <ark.div v-bind="triggerProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
