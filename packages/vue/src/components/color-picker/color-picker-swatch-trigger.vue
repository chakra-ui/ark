<script lang="ts">
import type { SwatchTriggerProps } from '@zag-js/color-picker'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerSwatchTriggerBaseProps extends SwatchTriggerProps, PolymorphicProps {}
export interface ColorPickerSwatchTriggerProps
  extends ColorPickerSwatchTriggerBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'disabled' | 'value'> {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

const props = defineProps<ColorPickerSwatchTriggerProps>()
const colorPicker = useColorPickerContext()
useForwardExpose()
</script>

<template>
  <ark.button v-bind="colorPicker.getSwatchTriggerProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
