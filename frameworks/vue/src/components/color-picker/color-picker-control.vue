<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface ColorPickerControlProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

defineProps<ColorPickerControlProps>()
const colorPicker = useColorPickerContext()
</script>

<template>
  <ark.div v-bind="colorPicker.controlProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
