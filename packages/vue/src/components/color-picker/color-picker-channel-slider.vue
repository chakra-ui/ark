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
import { ark } from '../factory'
import { ColorPickerChannelPropsProvider } from './use-color-picker-channel-props-context'
import { useColorPickerContext } from './use-color-picker-context'

const props = defineProps<ColorPickerChannelSliderProps>()
const colorPicker = useColorPickerContext()

ColorPickerChannelPropsProvider(props)
</script>

<template>
  <ark.div v-bind="colorPicker.getChannelSliderProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
