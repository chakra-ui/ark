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
import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { useSlots } from 'vue'
import { ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

defineProps<ColorPickerValueTextProps>()
const colorPicker = useColorPickerContext()
const slots = useSlots()
</script>

<template>
  <ark.span v-bind="colorPickerAnatomy.build().valueText.attrs" :as-child="asChild">
    <slot>
      {{ slots.default?.() || colorPicker.valueAsString }}
    </slot>
  </ark.span>
</template>
