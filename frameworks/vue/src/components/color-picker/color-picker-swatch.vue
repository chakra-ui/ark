<script lang="ts">
import type { SwatchProps } from '@zag-js/color-picker'
import type { PolimoprhicProps } from '../factory'

export interface ColorPickerSwatchProps extends SwatchProps, PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'
import { ColorPickerSwatchPropsProvider } from './use-color-picker-swatch-props-context'

const props = defineProps<ColorPickerSwatchProps>()
const colorPicker = useColorPickerContext()

ColorPickerSwatchPropsProvider(props)
</script>

<template>
  <ark.div v-bind="colorPicker.getSwatchProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
