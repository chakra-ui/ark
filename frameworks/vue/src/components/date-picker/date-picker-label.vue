<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface DatePickerLabelProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

defineProps<DatePickerLabelProps>()
const datePicker = useDatePickerContext()
</script>

<template>
  <ark.label v-bind="datePicker.labelProps" :as-child="asChild">
    <slot />
  </ark.label>
</template>
