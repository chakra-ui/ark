<script lang="ts">
import type { CellProps } from '@zag-js/time-picker'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TimePickerHourCellBaseProps extends CellProps, PolymorphicProps {}
export interface TimePickerHourCellProps
  extends TimePickerHourCellBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

const props = defineProps<TimePickerHourCellProps>()
const timePicker = useTimePickerContext()
</script>

<template>
  <ark.button v-bind="timePicker.getHourCellProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
