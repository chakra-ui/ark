<script lang="ts">
import type { ColorFormat } from '@zag-js/color-picker'
import type { PolimoprhicProps } from '../factory'

export interface ColorPickerViewProps extends PolimoprhicProps {
  format: ColorFormat
}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { colorPickerAnatomy } from '@ark-ui/anatomy'
import { useColorPickerContext } from './use-color-picker-context'

defineProps<ColorPickerViewProps>()
const colorPicker = useColorPickerContext()
</script>

<template>
  <ark.div
    v-if="colorPicker.format === format"
    v-bind="colorPickerAnatomy.build().view.attrs"
    :data-format="format"
    :as-child="asChild"
  >
    <slot />
  </ark.div>
</template>
