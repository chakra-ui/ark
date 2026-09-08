<script lang="ts">
import type { TriggerState } from '@zag-js/color-picker'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps, PolymorphicSlots } from '../factory.ts'

export interface ColorPickerTriggerState extends TriggerState {}
export interface ColorPickerTriggerBaseProps extends PolymorphicProps {}
export interface ColorPickerTriggerProps
  extends
    ColorPickerTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useColorPickerContext } from './use-color-picker-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<ColorPickerTriggerProps>()

defineSlots<PolymorphicSlots<ColorPickerTriggerState>>()
const colorPicker = useColorPickerContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="colorPicker.getTriggerProps()" :state="colorPicker.getTriggerState()" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
