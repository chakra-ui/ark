<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DatePickerControlBaseProps extends PolymorphicProps {}
export interface DatePickerControlProps
  extends
    DatePickerControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useDatePickerContext } from './use-date-picker-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<DatePickerControlProps>()
const datePicker = useDatePickerContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="datePicker.getControlProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
