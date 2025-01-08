<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DatePickerLabelBaseProps extends PolymorphicProps {}
export interface DatePickerLabelProps
  extends DatePickerLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

defineProps<DatePickerLabelProps>()
const datePicker = useDatePickerContext()

useForwardExpose()
</script>

<template>
  <ark.label v-bind="datePicker.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>
