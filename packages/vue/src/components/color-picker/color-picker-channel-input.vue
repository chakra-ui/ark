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
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<ColorPickerChannelInputProps>()
const colorPicker = useColorPickerContext()

useForwardExpose()
</script>

<template>
  <ark.input v-bind="colorPicker.getChannelInputProps(props)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.input>
</template>
