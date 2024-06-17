<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DatePickerPositionerBaseProps extends PolymorphicProps {}
export interface DatePickerPositionerProps
  extends DatePickerPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useRenderStrategyProps } from '../../utils'
import { Presence } from '../presence'
import { useDatePickerContext } from './use-date-picker-context'

defineProps<DatePickerPositionerProps>()
const datePicker = useDatePickerContext()
const renderStrategy = useRenderStrategyProps()
</script>

<template>
  <Presence
    v-bind="datePicker.getPositionerProps()"
    :present="datePicker.open"
    :lazy-mount="renderStrategy.lazyMount"
    :unmount-on-exit="renderStrategy.unmountOnExit"
  >
    <slot />
  </Presence>
</template>
