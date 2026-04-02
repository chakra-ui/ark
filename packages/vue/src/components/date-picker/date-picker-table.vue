<script lang="ts">
import type { TableProps } from '@zag-js/date-picker'
import type { TableHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DatePickerTableBaseProps extends TableProps, PolymorphicProps {}
export interface DatePickerTableProps
  extends
    DatePickerTableBaseProps,
    /**
     * @vue-ignore
     */
    TableHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { computed, useId } from 'vue'
import { useDatePickerContext } from './use-date-picker-context'
import { DatePickerTablePropsProvider } from './use-date-picker-table-props-context'
import { DEFAULT_VIEW_PROPS_CONTEXT, useDatePickerViewPropsContext } from './use-date-picker-view-props-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<DatePickerTableProps>()
const datePicker = useDatePickerContext()
const viewProps = useDatePickerViewPropsContext(DEFAULT_VIEW_PROPS_CONTEXT)

const uid = useId()
const tableProps = computed(() => ({ ...props, id: props.id ?? uid, ...viewProps }))

DatePickerTablePropsProvider(tableProps)

useForwardExpose()
</script>

<template>
  <ark.table v-bind="datePicker.getTableProps(tableProps)" :as-child="asChild">
    <slot />
  </ark.table>
</template>
