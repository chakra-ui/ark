<script lang="ts">
import type { SwatchTriggerProps } from '@zag-js/color-picker'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerSwatchTriggerProps extends SwatchTriggerProps, PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

const props = defineProps<ColorPickerSwatchTriggerProps>()
const colorPicker = useColorPickerContext()
</script>

<template>
  <ark.button v-bind="colorPicker.getSwatchTriggerProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
