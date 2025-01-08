<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DatePickerTableRowBaseProps extends PolymorphicProps {}
export interface DatePickerTableRowProps
  extends DatePickerTableRowBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTablePropsContext } from './use-date-picker-table-props-context'

defineProps<DatePickerTableRowProps>()
const datePicker = useDatePickerContext()
const tableProps = useDatePickerTablePropsContext()

useForwardExpose()
</script>

<template>
  <ark.tr v-bind="datePicker.getTableRowProps(tableProps)" :as-child="asChild">
    <slot />
  </ark.tr>
</template>
