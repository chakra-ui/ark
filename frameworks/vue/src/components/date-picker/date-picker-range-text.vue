<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface DatePickerRangeTextProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

defineProps<DatePickerRangeTextProps>()
const datePicker = useDatePickerContext()
</script>

<template>
  <ark.div v-bind="datePicker.rangeTextProps" :as-child="asChild">
    {{ datePicker.visibleRangeText.start }}
  </ark.div>
</template>
