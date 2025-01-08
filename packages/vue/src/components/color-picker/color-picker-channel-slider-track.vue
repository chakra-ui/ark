<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerChannelSliderTrackBaseProps extends PolymorphicProps {}
export interface ColorPickerChannelSliderTrackProps
  extends ColorPickerChannelSliderTrackBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { useColorPickerChannelPropsContext } from './use-color-picker-channel-props-context'
import { useColorPickerContext } from './use-color-picker-context'
import { useColorPickerFormatPropsContext } from './use-color-picker-format-context'
import { useForwardExpose } from '../../utils'

defineProps<ColorPickerChannelSliderTrackProps>()
const colorPicker = useColorPickerContext()

const formatProps = useColorPickerFormatPropsContext()
const channelProps = useColorPickerChannelPropsContext()
const channelSliderProps = computed(() => ({ ...channelProps, ...formatProps }))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="colorPicker.getChannelSliderTrackProps(channelSliderProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
