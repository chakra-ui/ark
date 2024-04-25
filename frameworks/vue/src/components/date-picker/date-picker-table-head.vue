<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface DatePickerTableHeadProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTablePropsContext } from './use-date-picker-table-props-context'

defineProps<DatePickerTableHeadProps>()
const datePicker = useDatePickerContext()
const tableProps = useDatePickerTablePropsContext()
</script>

<template>
  <ark.head v-bind="datePicker.getTableHeadProps(tableProps)" :as-child="asChild">
    <slot />
  </ark.head>
</template>
