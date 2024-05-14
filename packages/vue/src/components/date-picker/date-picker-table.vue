<script lang="ts">
import type { TableProps } from '@zag-js/date-picker'
import type { PolymorphicProps } from '../factory'

export interface DatePickerTableProps extends PolymorphicProps, TableProps {}
</script>

<script setup lang="ts">
import { useId } from '../../utils'
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { DatePickerTablePropsProvider } from './use-date-picker-table-props-context'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context'

const props = defineProps<DatePickerTableProps>()
const datePicker = useDatePickerContext()
const viewProps = useDatePickerViewPropsContext()
DatePickerTablePropsProvider({ ...props, id: useId().value, ...viewProps })
</script>

<template>
  <ark.table v-bind="datePicker.getTableProps(props)" :as-child="asChild">
    <slot />
  </ark.table>
</template>
