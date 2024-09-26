<script lang="ts">
import type { TableProps } from '@zag-js/date-picker'
import type { TableHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DatePickerTableBaseProps extends TableProps, PolymorphicProps {}
export interface DatePickerTableProps
  extends DatePickerTableBaseProps,
    /**
     * @vue-ignore
     */
    TableHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useId } from 'vue'
import { useDatePickerContext } from './use-date-picker-context'
import { DatePickerTablePropsProvider } from './use-date-picker-table-props-context'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context'

const props = defineProps<DatePickerTableProps>()
const datePicker = useDatePickerContext()
const viewProps = useDatePickerViewPropsContext()
const id = props.id ?? useId()
DatePickerTablePropsProvider({ ...props, id, ...viewProps })
</script>

<template>
  <ark.table v-bind="datePicker.getTableProps(props)" :as-child="asChild">
    <slot />
  </ark.table>
</template>
