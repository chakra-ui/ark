<script lang="ts">
import type { SelectHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerFormatSelectProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    SelectHTMLAttributes {}
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
