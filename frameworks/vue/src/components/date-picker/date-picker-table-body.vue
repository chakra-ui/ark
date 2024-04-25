<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface DatePickerTableBodyProps extends PolimoprhicProps {}
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
