<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TimePickerTriggerBaseProps extends PolymorphicProps {}
export interface TimePickerTriggerProps
  extends TimePickerTriggerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'
import { useForwardExpose } from '../../utils'

defineProps<TimePickerTriggerProps>()
const timePicker = useTimePickerContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="timePicker.getTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
