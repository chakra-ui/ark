<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DatePickerViewTriggerBaseProps extends PolymorphicProps {}
export interface DatePickerViewTriggerProps
  extends
    DatePickerViewTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { DEFAULT_VIEW_PROPS_CONTEXT, useDatePickerViewPropsContext } from './use-date-picker-view-props-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<DatePickerViewTriggerProps>()
const datePicker = useDatePickerContext()
const viewProps = useDatePickerViewPropsContext(DEFAULT_VIEW_PROPS_CONTEXT)

useForwardExpose()
</script>

<template>
  <ark.button v-bind="datePicker.getViewTriggerProps(viewProps)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
