<script lang="ts">
import type { ChannelInputProps } from '@zag-js/color-picker'
import type { InputHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface ColorPickerChannelInputProps
  extends ChannelInputProps,
    PolymorphicProps,
    /**
     * @vue-ignore
     */
    InputHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useColorPickerContext } from './use-color-picker-context'

const props = defineProps<ColorPickerChannelInputProps>()
const colorPicker = useColorPickerContext()
</script>

<template>
  <ark.input v-bind="colorPicker.getChannelInputProps(props)" :as-child="asChild" />
</template>
