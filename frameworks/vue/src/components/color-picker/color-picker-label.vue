<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface ColorPickerLabelProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

defineProps<ColorPickerLabelProps>()
const colorPicker = useColorPickerContext()
</script>

<template>
  <ark.label v-bind="colorPicker.labelProps" :as-child="asChild">
    <slot />
  </ark.label>
</template>
