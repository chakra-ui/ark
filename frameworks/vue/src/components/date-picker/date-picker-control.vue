<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface DatePickerControlProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

defineProps<DatePickerControlProps>()
const datePicker = useDatePickerContext()
</script>

<template>
  <ark.div v-bind="datePicker.controlProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
