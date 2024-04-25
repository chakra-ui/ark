<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface DatePickerContentProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

defineProps<DatePickerContentProps>()
const datePicker = useDatePickerContext()
</script>

<template>
  <ark.div v-bind="datePicker.contentProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
