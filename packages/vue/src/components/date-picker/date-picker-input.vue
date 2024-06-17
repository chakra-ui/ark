<script lang="ts">
import type { InputProps } from '@zag-js/date-picker'
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DatePickerInputBaseProps extends InputProps, PolymorphicProps {}
export interface DatePickerInputProps
  extends DatePickerInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

const props = defineProps<DatePickerInputProps>()
const datePicker = useDatePickerContext()
</script>

<template>
  <ark.input v-bind="datePicker.getInputProps(props)" :as-child="asChild" />
</template>
