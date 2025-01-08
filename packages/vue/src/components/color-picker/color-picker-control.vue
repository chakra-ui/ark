<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerControlBaseProps extends PolymorphicProps {}
export interface ColorPickerControlProps
  extends ColorPickerControlBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

defineProps<ColorPickerControlProps>()
const colorPicker = useColorPickerContext()
useForwardExpose()
</script>

<template>
  <ark.div v-bind="colorPicker.getControlProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
