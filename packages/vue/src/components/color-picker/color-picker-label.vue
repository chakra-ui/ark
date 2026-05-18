<script lang="ts">
import type { LabelHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ColorPickerLabelBaseProps extends PolymorphicProps {}
export interface ColorPickerLabelProps
  extends
    ColorPickerLabelBaseProps,
    /**
     * @vue-ignore
     */
    LabelHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ColorPickerLabelProps>()
const colorPicker = useColorPickerContext()

useForwardExpose()
</script>

<template>
  <ark.label v-bind="colorPicker.getLabelProps()" :as-child="asChild">
    <slot />
  </ark.label>
</template>
