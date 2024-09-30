<script lang="ts">
import type { ColumnProps } from '@zag-js/time-picker'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'
import { TimePickerColumnPropsProvider } from './use-time-picker-column-props-context'

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
import { useForwardExpose } from '../../utils'

const props = defineProps<TimePickerColumnProps>()

const timePicker = useTimePickerContext()
TimePickerColumnPropsProvider(props)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="timePicker.getColumnProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
