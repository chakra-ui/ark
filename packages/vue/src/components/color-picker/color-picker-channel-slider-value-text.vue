<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerChannelSliderValueTextBaseProps extends PolymorphicProps {}
export interface ColorPickerChannelSliderValueTextProps
  extends ColorPickerChannelSliderValueTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useSlots } from 'vue'
import { DEFAULT_LOCALE, useLocaleContext } from '../../providers'
import { ark } from '../factory'
import { useColorPickerChannelPropsContext } from './use-color-picker-channel-props-context'
import { useColorPickerContext } from './use-color-picker-context'

defineProps<ColorPickerChannelSliderValueTextProps>()
const colorPicker = useColorPickerContext()
const channelProps = useColorPickerChannelPropsContext()
const slots = useSlots()
const localeContext = useLocaleContext(DEFAULT_LOCALE)
</script>

<template>
  <ark.span v-bind="colorPicker.getChannelSliderValueTextProps(channelProps)" :as-child="asChild">
    <slot>
      {{
        slots.default?.() ||
        colorPicker.getChannelValueText(channelProps.channel, localeContext.locale)
      }}
    </slot>
  </ark.span>
</template>
