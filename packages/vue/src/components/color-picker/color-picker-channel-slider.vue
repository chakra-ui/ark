<script lang="ts">
import type { ChannelProps } from '@zag-js/color-picker'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerChannelSliderProps
  extends ChannelProps,
    PolymorphicProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { ColorPickerChannelPropsProvider } from './use-color-picker-channel-props-context'
import { useColorPickerContext } from './use-color-picker-context'
import { useColorPickerFormatPropsContext } from './use-color-picker-format-context'

const props = defineProps<ColorPickerChannelSliderProps>()

const colorPicker = useColorPickerContext()
const formatProps = useColorPickerFormatPropsContext()
const channelSliderProps = computed(() => ({ ...props, ...formatProps }))

ColorPickerChannelPropsProvider(props)
</script>

<template>
  <ark.div v-bind="colorPicker.getChannelSliderProps(channelSliderProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
