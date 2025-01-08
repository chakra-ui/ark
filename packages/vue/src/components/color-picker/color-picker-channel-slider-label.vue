<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerChannelSliderLabelBaseProps extends PolymorphicProps {}
export interface ColorPickerChannelSliderLabelProps
  extends ColorPickerChannelSliderLabelBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useColorPickerChannelPropsContext } from './use-color-picker-channel-props-context'
import { useColorPickerContext } from './use-color-picker-context'

defineProps<ColorPickerChannelSliderLabelProps>()
const colorPicker = useColorPickerContext()
const channelProps = useColorPickerChannelPropsContext()
useForwardExpose()
</script>

<template>
  <ark.label v-bind="colorPicker.getChannelSliderLabelProps(channelProps)" :as-child="asChild">
    <slot />
  </ark.label>
</template>
