<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TimePickerClearTriggerBaseProps extends PolymorphicProps {}
export interface TimePickerClearTriggerProps
  extends TimePickerClearTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

defineProps<TimePickerClearTriggerProps>()
const timePicker = useTimePickerContext()
</script>

<template>
  <ark.button v-bind="timePicker.getClearTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
