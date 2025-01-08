<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DatePickerTriggerBaseProps extends PolymorphicProps {}
export interface DatePickerTriggerProps
  extends DatePickerTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

defineProps<DatePickerTriggerProps>()
const datePicker = useDatePickerContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="datePicker.getTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
