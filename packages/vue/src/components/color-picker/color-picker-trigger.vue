<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerTriggerBaseProps extends PolymorphicProps {}
export interface ColorPickerTriggerProps
  extends ColorPickerTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

defineProps<ColorPickerTriggerProps>()
const colorPicker = useColorPickerContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="colorPicker.getTriggerProps()" :as-child="asChild">
    <slot />
  </ark.button>
</template>
