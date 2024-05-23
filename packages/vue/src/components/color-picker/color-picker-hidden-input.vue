<script lang="ts">
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerHiddenInputProps
  extends PolymorphicProps,
    /* @vue-ignore */ InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

defineProps<ColorPickerHiddenInputProps>()
const colorPicker = useColorPickerContext()
</script>

<template>
  <ark.input v-bind="colorPicker.hiddenInputProps" :as-child="asChild" />
</template>
