<script lang="ts">
import type { TransparencyGridProps } from '@zag-js/color-picker'
import type { PolimoprhicProps } from '../factory'

export interface ColorPickerTransparencyGridProps extends TransparencyGridProps, PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

const props = defineProps<ColorPickerTransparencyGridProps>()
const colorPicker = useColorPickerContext()
</script>

<template>
  <ark.div v-bind="colorPicker.getTransparencyGridProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
