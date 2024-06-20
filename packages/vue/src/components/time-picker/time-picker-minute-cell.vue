<script lang="ts">
import type { CellProps } from '@zag-js/time-picker'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TimePickerMinuteCellBaseProps extends CellProps, PolymorphicProps {}
export interface TimePickerMinuteCellProps
  extends TimePickerMinuteCellBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

const props = defineProps<TimePickerMinuteCellProps>()
const timePicker = useTimePickerContext()
</script>

<template>
  <ark.button v-bind="timePicker.getMinuteCellProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
