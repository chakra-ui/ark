<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerSwatchIndicatorBaseProps extends PolymorphicProps {}
export interface ColorPickerSwatchIndicatorProps
  extends ColorPickerSwatchIndicatorBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'
import { useColorPickerSwatchPropsContext } from './use-color-picker-swatch-props-context'
import { useForwardExpose } from '../../utils'

defineProps<ColorPickerSwatchIndicatorProps>()
const colorPicker = useColorPickerContext()
const swatchProps = useColorPickerSwatchPropsContext()
useForwardExpose()
</script>

<template>
  <ark.div v-bind="colorPicker.getSwatchIndicatorProps(swatchProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
