<script lang="ts">
import type { SwatchProps } from '@zag-js/color-picker'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

interface ValueSwatchProps extends Omit<SwatchProps, 'value'> {}

export interface ColorPickerValueSwatchBaseProps extends ValueSwatchProps, PolymorphicProps {}
export interface ColorPickerValueSwatchProps
  extends ColorPickerValueSwatchBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'
import { ColorPickerSwatchPropsProvider } from './use-color-picker-swatch-props-context'

const props = defineProps<ColorPickerValueSwatchBaseProps>()
const colorPicker = useColorPickerContext()
const swatchProps = computed(() => ({
  value: colorPicker.value.value,
  respectAlpha: props.respectAlpha,
}))

ColorPickerSwatchPropsProvider(swatchProps.value)
</script>

<template>
  <ark.div v-bind="colorPicker.getSwatchProps(swatchProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
