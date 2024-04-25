<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface ColorPickerFormatSelectProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

defineProps<ColorPickerFormatSelectProps>()
const colorPicker = useColorPickerContext()
</script>

<template>
  <ark.select v-bind="colorPicker.formatSelectProps">
    <ark.option v-for="format in ['rgba', 'hsla', 'hsba']" :key="format" :value="format">
      {{ format }}
    </ark.option>
  </ark.select>
</template>
