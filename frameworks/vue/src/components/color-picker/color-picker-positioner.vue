<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface ColorPickerPositionerProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { useRenderStrategyContext } from '../../utils/use-render-strategy'
import { Presence } from '../presence'
import { useColorPickerContext } from './use-color-picker-context'

defineProps<ColorPickerPositionerProps>()
const colorPicker = useColorPickerContext()
const renderStrategyProps = useRenderStrategyContext()
</script>

<template>
  <Presence
    v-bind="colorPicker.positionerProps"
    :present="colorPicker.open"
    :lazy-mount="renderStrategyProps.lazyMount"
    :unmount-on-exit="renderStrategyProps.unmountOnExit"
  >
    <slot />
  </Presence>
</template>
