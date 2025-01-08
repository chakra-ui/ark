<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DatePickerClearTriggerBaseProps extends PolymorphicProps {}
export interface DatePickerClearTriggerProps
  extends DatePickerClearTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

defineProps<DatePickerClearTriggerProps>()
const datePicker = useDatePickerContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="datePicker.getClearTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
