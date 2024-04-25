<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface DatePickerTableHeaderProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTablePropsContext } from './use-date-picker-table-props-context'

defineProps<DatePickerTableHeaderProps>()
const datePicker = useDatePickerContext()
const tableProps = useDatePickerTablePropsContext()
</script>

<template>
  <ark.th v-bind="datePicker.getTableHeaderProps(tableProps)" :as-child="asChild">
    <slot />
  </ark.th>
</template>
