<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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
import { ark } from '../factory.ts'
import { useDatePickerContext } from './use-date-picker-context.ts'
import { DEFAULT_VIEW_PROPS_CONTEXT, useDatePickerViewPropsContext } from './use-date-picker-view-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

defineProps<DatePickerViewTriggerProps>()
const datePicker = useDatePickerContext()
const viewProps = useDatePickerViewPropsContext(DEFAULT_VIEW_PROPS_CONTEXT)

useForwardExpose()
</script>

<template>
  <ark.button v-bind="datePicker.getViewTriggerProps(viewProps)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.button>
</template>
