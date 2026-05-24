<script lang="ts">
import type { DateValue } from '@zag-js/date-picker'
import type { TdHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DatePickerWeekNumberCellBaseProps extends PolymorphicProps {
  weekIndex: number
  week: DateValue[]
}
export interface DatePickerWeekNumberCellProps
  extends
    DatePickerWeekNumberCellBaseProps,
    /**
     * @vue-ignore
     */
    TdHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useDatePickerContext } from './use-date-picker-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<DatePickerWeekNumberCellProps>()
const datePicker = useDatePickerContext()

useForwardExpose()
</script>

<template>
  <ark.td
    v-bind="datePicker.getWeekNumberCellProps({ weekIndex: props.weekIndex, week: props.week })"
    :as-child="asChild"
  >
    <slot />
  </ark.td>
</template>
