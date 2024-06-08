<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DatePickerLabelProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

defineProps<DatePickerLabelProps>()
const datePicker = useDatePickerContext()
</script>

<template>
  <ark.label v-bind="datePicker.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>
