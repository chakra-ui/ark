<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface ColorPickerTriggerProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

defineProps<ColorPickerTriggerProps>()
const colorPicker = useColorPickerContext()
</script>

<template>
  <ark.button v-bind="colorPicker.triggerProps" :as-child="asChild">
    <slot />
  </ark.button>
</template>
