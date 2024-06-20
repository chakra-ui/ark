<script lang="ts">
import type { CellProps } from '@zag-js/time-picker'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TimePickerSecondCellBaseProps extends CellProps, PolymorphicProps {}
export interface TimePickerSecondCellProps
  extends TimePickerSecondCellBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

const props = defineProps<TimePickerSecondCellProps>()
const timePicker = useTimePickerContext()
</script>

<template>
  <ark.button v-bind="timePicker.getSecondCellProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
