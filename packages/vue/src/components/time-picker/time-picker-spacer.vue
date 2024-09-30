<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TimePickerSpacerBaseProps extends PolymorphicProps {}
export interface TimePickerSpacerProps
  extends TimePickerSpacerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'
import { useForwardExpose } from '../../utils'

defineProps<TimePickerSpacerProps>()
const timePicker = useTimePickerContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="timePicker.getSpacerProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
