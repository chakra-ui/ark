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
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useFieldContext } from '../field'
import { useColorPickerContext } from './use-color-picker-context'

defineProps<ColorPickerHiddenInputProps>()
const colorPicker = useColorPickerContext()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <ark.input
    :aria-describedby="field?.ariaDescribedby"
    v-bind="colorPicker.getHiddenInputProps()"
    :as-child="asChild"
  >
    <slot />
  </ark.input>
</template>
