<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DatePickerPrevTriggerBaseProps extends PolymorphicProps {}
export interface DatePickerPrevTriggerProps
  extends
    DatePickerPrevTriggerBaseProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useDatePickerContext } from './use-date-picker-context.ts'
import { DEFAULT_VIEW_PROPS_CONTEXT, useDatePickerViewPropsContext } from './use-date-picker-view-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<DatePickerPrevTriggerProps>()
const datePicker = useDatePickerContext()
const viewProps = useDatePickerViewPropsContext(DEFAULT_VIEW_PROPS_CONTEXT)

useForwardExpose()
</script>

<template>
  <ark.button v-bind="datePicker.getPrevTriggerProps(viewProps)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
