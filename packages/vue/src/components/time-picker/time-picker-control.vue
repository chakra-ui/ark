<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TimePickerControlBaseProps extends PolymorphicProps {}
export interface TimePickerControlProps
  extends TimePickerControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

defineProps<TimePickerControlProps>()
const timePicker = useTimePickerContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="timePicker.getControlProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
