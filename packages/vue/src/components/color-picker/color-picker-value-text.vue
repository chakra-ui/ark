<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerValueTextBaseProps extends PolymorphicProps {}
export interface ColorPickerValueTextProps
  extends ColorPickerValueTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'
import { useForwardExpose } from '../../utils'

defineProps<ColorPickerValueTextProps>()
const colorPicker = useColorPickerContext()
const slots = defineSlots()

useForwardExpose()
</script>

<template>
  <ark.span v-bind="colorPicker.getValueTextProps()" :as-child="asChild">
    <slot>
      {{ slots.default?.() || colorPicker.valueAsString }}
    </slot>
  </ark.span>
</template>
