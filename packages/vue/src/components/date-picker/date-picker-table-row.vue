<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface DatePickerTableRowProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTablePropsContext } from './use-date-picker-table-props-context'

defineProps<DatePickerTableRowProps>()
const datePicker = useDatePickerContext()
const tableProps = useDatePickerTablePropsContext()
</script>

<template>
  <ark.tr v-bind="datePicker.getTableRowProps(tableProps)" :as-child="asChild">
    <slot />
  </ark.tr>
</template>
