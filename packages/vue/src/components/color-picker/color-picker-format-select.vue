<script lang="ts">
import type { SelectHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerFormatSelectBaseProps extends PolymorphicProps {}
export interface ColorPickerFormatSelectProps
  extends ColorPickerFormatSelectBaseProps,
    /**
     * @vue-ignore
     */
    SelectHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

defineProps<ColorPickerFormatSelectProps>()
const colorPicker = useColorPickerContext()

useForwardExpose()
</script>

<template>
  <ark.select v-bind="colorPicker.getFormatSelectProps()">
    <ark.option v-for="format in ['rgba', 'hsla', 'hsba']" :key="format" :value="format">
      {{ format }}
    </ark.option>
  </ark.select>
</template>
