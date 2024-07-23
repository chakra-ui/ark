<script lang="ts">
import type { CellProps, PeriodCellProps, TimePeriod } from '@zag-js/time-picker'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import { useTimePickerColumnPropsContext } from './use-time-picker-column-props-context'

interface CombinedCellProps {
  value: number | TimePeriod
}

export interface TimePickerCellBaseProps extends CombinedCellProps, PolymorphicProps {}
export interface TimePickerCellProps
  extends TimePickerCellBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'value'> {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

const props = defineProps<TimePickerCellProps>()
const timePicker = useTimePickerContext()
const columnProps = useTimePickerColumnPropsContext()

const unitToPropsMap = {
    hour: () => timePicker.value.getHourCellProps(props as CellProps),
    minute: () => timePicker.value.getMinuteCellProps(props as CellProps),
    second: () => timePicker.value.getSecondCellProps(props as CellProps),
    period: () => timePicker.value.getPeriodCellProps(props as PeriodCellProps),
  }

const cellProps = unitToPropsMap[columnProps.unit]()
</script>

<template>
  <ark.button v-bind="cellProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
