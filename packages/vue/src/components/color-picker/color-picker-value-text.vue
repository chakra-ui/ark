<script lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import type { PolymorphicProps } from '../factory'

type ColorHexFormat = 'hex' | 'hexa'
type ColorFormat = 'rgba' | 'hsla' | 'hsba'
type ColorStringFormat = ColorHexFormat | ColorFormat | 'rgb' | 'hsl' | 'hsb' | 'css'

export interface ColorPickerValueTextBaseProps extends PolymorphicProps {
  format?: ColorStringFormat
}
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

const props = defineProps<ColorPickerValueTextProps>()
const colorPicker = useColorPickerContext()
const slots = defineSlots()

useForwardExpose()

const valueAsString = computed(() =>
  props.format ? colorPicker.value.value.toString(props.format) : colorPicker.value.valueAsString,
)
</script>

<template>
  <ark.span v-bind="colorPicker.getValueTextProps()" :as-child="asChild">
    <slot>
      {{ slots.default?.() || valueAsString }}
    </slot>
  </ark.span>
</template>
