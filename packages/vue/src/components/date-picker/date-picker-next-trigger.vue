<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DatePickerNextTriggerBaseProps extends PolymorphicProps {}
export interface DatePickerNextTriggerProps
  extends DatePickerNextTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context'

defineProps<DatePickerNextTriggerProps>()
const datePicker = useDatePickerContext()
const viewProps = useDatePickerViewPropsContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="datePicker.getNextTriggerProps(viewProps)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
