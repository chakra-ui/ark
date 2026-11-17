<script lang="ts">
import type { ChannelInputProps } from '@zag-js/color-picker'
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ColorPickerChannelInputBaseProps extends ChannelInputProps, PolymorphicProps {}
export interface ColorPickerChannelInputProps
  extends
    ColorPickerChannelInputBaseProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { useFieldContext } from '../field/index.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<ColorPickerChannelInputProps>()
const colorPicker = useColorPickerContext()
const field = useFieldContext()

useForwardExpose()
</script>

<template>
  <ark.input
    :aria-describedby="field?.ariaDescribedby"
    v-bind="colorPicker.getChannelInputProps(props)"
    :as-child="asChild"
  >
    <slot />
  </ark.input>
</template>
