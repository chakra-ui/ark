<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TimePickerInputBaseProps extends PolymorphicProps {}
export interface TimePickerInputProps
  extends TimePickerInputBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'
import { useForwardExpose } from '../../utils'

defineProps<TimePickerInputProps>()
const timePicker = useTimePickerContext()

useForwardExpose()
</script>

<template>
  <ark.input v-bind="timePicker.getInputProps()" :as-child="asChild">
    <slot />
  </ark.input>
</template>
