<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface ColorPickerChannelSliderTrackProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useColorPickerChannelPropsContext } from './use-color-picker-channel-props-context'
import { useColorPickerContext } from './use-color-picker-context'

defineProps<ColorPickerChannelSliderTrackProps>()
const colorPicker = useColorPickerContext()
const channelProps = useColorPickerChannelPropsContext()
</script>

<template>
  <ark.div v-bind="colorPicker.getChannelSliderTrackProps(channelProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
