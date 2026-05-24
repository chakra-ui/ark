<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ColorPickerChannelSliderThumbBaseProps extends PolymorphicProps {}
export interface ColorPickerChannelSliderThumbProps
  extends
    ColorPickerChannelSliderThumbBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { useColorPickerChannelPropsContext } from './use-color-picker-channel-props-context.ts'
import { useColorPickerFormatPropsContext } from './use-color-picker-format-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ColorPickerChannelSliderThumbProps>()
const colorPicker = useColorPickerContext()
const formatProps = useColorPickerFormatPropsContext()
const channelProps = useColorPickerChannelPropsContext()
const channelSliderProps = computed(() => ({ ...channelProps, ...formatProps }))
useForwardExpose()
</script>

<template>
  <ark.div v-bind="colorPicker.getChannelSliderThumbProps(channelSliderProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
