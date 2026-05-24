<script lang="ts">
import type { SwatchProps } from '@zag-js/color-picker'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

interface ValueSwatchProps extends Omit<SwatchProps, 'value'> {}

export interface ColorPickerValueSwatchBaseProps extends ValueSwatchProps, PolymorphicProps {}
export interface ColorPickerValueSwatchProps
  extends
    ColorPickerValueSwatchBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { ColorPickerSwatchPropsProvider } from './use-color-picker-swatch-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<ColorPickerValueSwatchBaseProps>()
const colorPicker = useColorPickerContext()
const swatchProps = computed(() => ({
  value: colorPicker.value.value,
  respectAlpha: props.respectAlpha,
}))

ColorPickerSwatchPropsProvider(swatchProps.value)
useForwardExpose()
</script>

<template>
  <ark.div v-bind="colorPicker.getSwatchProps(swatchProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
