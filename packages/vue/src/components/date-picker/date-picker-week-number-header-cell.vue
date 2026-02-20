<script lang="ts">
import type { ThHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DatePickerWeekNumberHeaderCellBaseProps extends PolymorphicProps {}
export interface DatePickerWeekNumberHeaderCellProps
  extends
    DatePickerWeekNumberHeaderCellBaseProps,
    /**
     * @vue-ignore
     */
    ThHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTablePropsContext } from './use-date-picker-table-props-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<DatePickerWeekNumberHeaderCellProps>()
const datePicker = useDatePickerContext()
const tableProps = useDatePickerTablePropsContext()

useForwardExpose()
</script>

<template>
  <ark.th v-bind="datePicker.getWeekNumberHeaderCellProps(tableProps)" :as-child="asChild">
    <slot />
  </ark.th>
</template>
