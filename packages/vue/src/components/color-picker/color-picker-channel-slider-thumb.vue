<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerChannelSliderThumbProps
  extends PolymorphicProps,
    /* @vue-ignore */ HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'
import { useColorPickerChannelPropsContext } from './use-color-picker-channel-props-context'

defineProps<ColorPickerChannelSliderThumbProps>()
const colorPicker = useColorPickerContext()
const channelProps = useColorPickerChannelPropsContext()
</script>

<template>
  <ark.div v-bind="colorPicker.getChannelSliderThumbProps(channelProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
