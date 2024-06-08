<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DatePickerControlProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

defineProps<DatePickerControlProps>()
const datePicker = useDatePickerContext()
</script>

<template>
  <ark.div v-bind="datePicker.getControlProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
