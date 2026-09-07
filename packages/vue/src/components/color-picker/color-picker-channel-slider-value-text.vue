<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface ColorPickerChannelSliderValueTextBaseProps extends PolymorphicProps {}
export interface ColorPickerChannelSliderValueTextProps
  extends
    ColorPickerChannelSliderValueTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { DEFAULT_LOCALE, useLocaleContext } from '../../providers/index.ts'
import { ark } from '../factory.ts'
import { useColorPickerChannelPropsContext } from './use-color-picker-channel-props-context.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ColorPickerChannelSliderValueTextProps>()
const colorPicker = useColorPickerContext()
const channelProps = useColorPickerChannelPropsContext()
const slots = defineSlots()
const localeContext = useLocaleContext(DEFAULT_LOCALE)

useForwardExpose()
</script>

<template>
  <ark.span v-bind="colorPicker.getChannelSliderValueTextProps(channelProps)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot>
        {{ slots.default?.() || colorPicker.getChannelValueText(channelProps.channel, localeContext.locale) }}
      </slot>
    </template>
  </ark.span>
</template>
