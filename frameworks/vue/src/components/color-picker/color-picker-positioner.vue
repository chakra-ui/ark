<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface ColorPickerPositionerProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { useRenderStrategyContext } from '../../utils/use-render-strategy'
import { Presence } from '../presence'
import { useColorPickerContext } from './use-color-picker-context'

defineProps<ColorPickerPositionerProps>()
const colorPicker = useColorPickerContext()
const renderStrategy = useRenderStrategyContext()
</script>

<template>
  <Presence
    v-bind="colorPicker.positionerProps"
    :present="colorPicker.open"
    :lazy-mount="renderStrategy.lazyMount"
    :unmount-on-exit="renderStrategy.unmountOnExit"
  >
    <slot />
  </Presence>
</template>
