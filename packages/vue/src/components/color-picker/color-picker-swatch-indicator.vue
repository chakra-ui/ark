<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface ColorPickerSwatchIndicatorProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'
import { useColorPickerSwatchPropsContext } from './use-color-picker-swatch-props-context'

defineProps<ColorPickerSwatchIndicatorProps>()
const colorPicker = useColorPickerContext()
const swatchProps = useColorPickerSwatchPropsContext()
</script>

<template>
  <ark.div v-bind="colorPicker.getSwatchIndicatorProps(swatchProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
