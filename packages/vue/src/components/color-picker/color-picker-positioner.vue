<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerPositionerBaseProps extends PolymorphicProps {}
export interface ColorPickerPositionerProps
  extends ColorPickerPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useRenderStrategyProps } from '../../utils'
import { Presence } from '../presence'
import { useColorPickerContext } from './use-color-picker-context'

defineProps<ColorPickerPositionerProps>()
const colorPicker = useColorPickerContext()
const renderStrategy = useRenderStrategyProps()
</script>

<template>
  <Presence
    v-bind="colorPicker.getPositionerProps()"
    :present="colorPicker.open"
    :lazy-mount="renderStrategy.lazyMount"
    :unmount-on-exit="renderStrategy.unmountOnExit"
  >
    <slot />
  </Presence>
</template>
