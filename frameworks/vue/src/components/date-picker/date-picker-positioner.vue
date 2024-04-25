<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface DatePickerPositionerProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { useRenderStrategyContext } from '../../utils/use-render-strategy'
import { Presence } from '../presence'
import { useDatePickerContext } from './use-date-picker-context'

defineProps<DatePickerPositionerProps>()
const datePicker = useDatePickerContext()
const renderStrategy = useRenderStrategyContext()
</script>

<template>
  <Presence
    v-bind="datePicker.positionerProps"
    :present="datePicker.open"
    :lazy-mount="renderStrategy.lazyMount"
    :unmount-on-exit="renderStrategy.unmountOnExit"
  >
    <slot />
  </Presence>
</template>
