<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DatePickerTableBodyBaseProps extends PolymorphicProps {}
export interface DatePickerTableBodyProps
  extends DatePickerTableBodyBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTablePropsContext } from './use-date-picker-table-props-context'

defineProps<DatePickerTableBodyProps>()
const datePicker = useDatePickerContext()
const tableProps = useDatePickerTablePropsContext()
</script>

<template>
  <ark.tbody v-bind="datePicker.getTableBodyProps(tableProps)" :as-child="asChild">
    <slot />
  </ark.tbody>
</template>
