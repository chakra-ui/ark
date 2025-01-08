<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerEyeDropperTriggerBaseProps extends PolymorphicProps {}
export interface ColorPickerEyeDropperTriggerProps
  extends ColorPickerEyeDropperTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

defineProps<ColorPickerEyeDropperTriggerProps>()
const colorPicker = useColorPickerContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="colorPicker.getEyeDropperTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
