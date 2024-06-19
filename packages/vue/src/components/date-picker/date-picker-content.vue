<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DatePickerContentBaseProps extends PolymorphicProps {}
export interface DatePickerContentProps
  extends DatePickerContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

defineProps<DatePickerContentProps>()
const datePicker = useDatePickerContext()
</script>

<template>
  <ark.div v-bind="datePicker.getContentProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
