<script lang="ts">
import type { PeriodCellProps } from '@zag-js/time-picker'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TimePickerPeriodCellBaseProps extends PeriodCellProps, PolymorphicProps {}
export interface TimePickerPeriodCellProps
  extends TimePickerPeriodCellBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

const props = defineProps<TimePickerPeriodCellProps>()
const timePicker = useTimePickerContext()
</script>

<template>
  <ark.button v-bind="timePicker.getPeriodCellProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
