<script lang="ts">
import type { SwatchProps } from '@zag-js/color-picker'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerSwatchBaseProps extends SwatchProps, PolymorphicProps {}
export interface ColorPickerSwatchProps
  extends ColorPickerSwatchBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'
import { ColorPickerSwatchPropsProvider } from './use-color-picker-swatch-props-context'
import { useForwardExpose } from '../../utils'

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
