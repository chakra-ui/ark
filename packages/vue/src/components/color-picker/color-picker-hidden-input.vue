<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerHiddenInputBaseProps extends PolymorphicProps {}
export interface ColorPickerHiddenInputProps
  extends ColorPickerHiddenInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

defineProps<ColorPickerHiddenInputProps>()
const colorPicker = useColorPickerContext()
</script>

<template>
  <ark.input v-bind="colorPicker.getHiddenInputProps()" :as-child="asChild"><slot /></ark.input>
</template>
