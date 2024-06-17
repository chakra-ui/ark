<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerLabelBaseProps extends PolymorphicProps {}
export interface ColorPickerLabelProps
  extends ColorPickerLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

defineProps<ColorPickerLabelProps>()
const colorPicker = useColorPickerContext()
</script>

<template>
  <ark.label v-bind="colorPicker.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>
