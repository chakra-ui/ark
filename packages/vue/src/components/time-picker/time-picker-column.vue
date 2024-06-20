<script lang="ts">
import type { ColumnProps } from '@zag-js/time-picker'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TimePickerColumnBaseProps extends ColumnProps, PolymorphicProps {}
export interface TimePickerColumnProps
  extends TimePickerColumnBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

const props = defineProps<TimePickerColumnProps>()
const timePicker = useTimePickerContext()
</script>

<template>
  <ark.div v-bind="timePicker.getColumnProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
