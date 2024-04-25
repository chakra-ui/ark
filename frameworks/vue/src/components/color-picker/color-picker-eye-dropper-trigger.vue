<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface ColorPickerEyeDropperTriggerProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

defineProps<ColorPickerEyeDropperTriggerProps>()
const colorPicker = useColorPickerContext()
</script>

<template>
  <ark.button v-bind="colorPicker.eyeDropperTriggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
