<script lang="ts">
import type { PolymorphicProps } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

export interface ColorPickerValueTextProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { useSlots } from 'vue'
import { ark } from '../factory'

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
