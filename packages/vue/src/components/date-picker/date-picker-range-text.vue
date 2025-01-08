<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DatePickerRangeTextBaseProps extends PolymorphicProps {}
export interface DatePickerRangeTextProps
  extends DatePickerRangeTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useForwardExpose } from '../../utils'

defineProps<DatePickerRangeTextProps>()
const datePicker = useDatePickerContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="datePicker.getRangeTextProps()" :as-child="asChild">
    {{ datePicker.visibleRangeText.start }}
  </ark.div>
</template>
