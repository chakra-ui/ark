<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TimePickerLabelBaseProps extends PolymorphicProps {}
export interface TimePickerLabelProps
  extends TimePickerLabelBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'
import { useForwardExpose } from '../../utils'

defineProps<TimePickerLabelProps>()
const timePicker = useTimePickerContext()

useForwardExpose()
</script>

<template>
  <ark.label v-bind="timePicker.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>
