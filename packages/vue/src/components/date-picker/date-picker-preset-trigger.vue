<script lang="ts">
import type { PresetTriggerProps } from '@zag-js/date-picker'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DatePickerPresetTriggerBaseProps extends PresetTriggerProps, PolymorphicProps {}
export interface DatePickerPresetTriggerProps
  extends DatePickerPresetTriggerBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'value'> {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useForwardExpose } from '../../utils'

const props = defineProps<DatePickerPresetTriggerProps>()
const datePicker = useDatePickerContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="datePicker.getPresetTriggerProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
