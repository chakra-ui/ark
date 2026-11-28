<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DatePickerTableCellTriggerBaseProps extends PolymorphicProps {}
export interface DatePickerTableCellTriggerProps
  extends
    DatePickerTableCellTriggerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { getTableCellProps } from './get-table-cell-props.ts'
import { useDatePickerContext } from './use-date-picker-context.ts'
import { useDatePickerTableCellPropsContext } from './use-date-picker-table-cell-props-context.ts'
import { DEFAULT_VIEW_PROPS_CONTEXT, useDatePickerViewPropsContext } from './use-date-picker-view-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<DatePickerTableCellTriggerProps>()
const datePicker = useDatePickerContext()
const cellProps = useDatePickerTableCellPropsContext()
const viewProps = useDatePickerViewPropsContext(DEFAULT_VIEW_PROPS_CONTEXT)

const triggerProps = computed(() => {
  return getTableCellProps(viewProps.view ?? 'day', cellProps, {
    day: datePicker.value.getDayTableCellTriggerProps,
    month: datePicker.value.getMonthTableCellTriggerProps,
    year: datePicker.value.getYearTableCellTriggerProps,
  })
})

useForwardExpose()
</script>

<template>
  <ark.div v-bind="triggerProps" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
