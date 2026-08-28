<script lang="ts">
import type { SwatchProps } from '@zag-js/color-picker'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ColorPickerSwatchBaseProps extends SwatchProps, PolymorphicProps {}
export interface ColorPickerSwatchProps
  extends
    ColorPickerSwatchBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { ColorPickerSwatchPropsProvider } from './use-color-picker-swatch-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<ColorPickerSwatchProps>()
const colorPicker = useColorPickerContext()

ColorPickerSwatchPropsProvider(props)
useForwardExpose()
</script>

<template>
  <ark.div v-bind="colorPicker.getSwatchProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
