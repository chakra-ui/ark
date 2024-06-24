<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface TimePickerPositionerBaseProps extends PolymorphicProps {}
export interface TimePickerPositionerProps
  extends TimePickerPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useRenderStrategyProps } from '../../utils'
import { Presence } from '../presence'
import { useTimePickerContext } from './use-time-picker-context'

defineProps<TimePickerPositionerProps>()
const timePicker = useTimePickerContext()
const renderStrategy = useRenderStrategyProps()
</script>

<template>
  <Presence
    v-bind="timePicker.getPositionerProps()"
    :present="timePicker.open"
    :lazy-mount="renderStrategy.lazyMount"
    :unmount-on-exit="renderStrategy.unmountOnExit"
  >
    <slot />
  </Presence>
</template>
