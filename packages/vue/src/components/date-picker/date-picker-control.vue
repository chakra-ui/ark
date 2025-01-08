<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DatePickerControlBaseProps extends PolymorphicProps {}
export interface DatePickerControlProps
  extends DatePickerControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

defineProps<DatePickerControlProps>()
const datePicker = useDatePickerContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="datePicker.getControlProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
