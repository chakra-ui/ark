<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TimePickerContentBaseProps extends PolymorphicProps {}
export interface TimePickerContentProps
  extends TimePickerContentBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useTimePickerContext } from './use-time-picker-context'

defineProps<TimePickerContentProps>()
const timePicker = useTimePickerContext()
</script>

<template>
  <ark.div v-bind="timePicker.getContentProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
