<script lang="ts">
import type { InputProps } from '@zag-js/date-picker'
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DatePickerInputBaseProps extends InputProps, PolymorphicProps {}
export interface DatePickerInputProps
  extends
    DatePickerInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useDatePickerContext } from './use-date-picker-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<DatePickerInputProps>()
const datePicker = useDatePickerContext()

useForwardExpose()
</script>

<template>
  <ark.input v-bind="datePicker.getInputProps(props)" :as-child="asChild"><slot /></ark.input>
</template>
