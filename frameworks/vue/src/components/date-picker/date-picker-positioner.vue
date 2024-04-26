<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface DatePickerPositionerProps extends PolymorphicProps {}
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
    v-bind="datePicker.positionerProps"
    :present="datePicker.open"
    :lazy-mount="renderStrategy.lazyMount"
    :unmount-on-exit="renderStrategy.unmountOnExit"
  >
    <slot />
  </Presence>
</template>
