<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DatePickerTableHeadBaseProps extends PolymorphicProps {}
export interface DatePickerTableHeadProps
  extends DatePickerTableHeadBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerTablePropsContext } from './use-date-picker-table-props-context'
import { useForwardExpose } from '../../utils'

defineProps<DatePickerTableHeadProps>()
const datePicker = useDatePickerContext()
const tableProps = useDatePickerTablePropsContext()

useForwardExpose()
</script>

<template>
  <ark.thead v-bind="datePicker.getTableHeadProps(tableProps)" :as-child="asChild">
    <slot />
  </ark.thead>
</template>
