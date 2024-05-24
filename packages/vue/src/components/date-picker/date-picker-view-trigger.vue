<script lang="ts">
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DatePickerViewTriggerProps
  extends PolymorphicProps,
    /**
     * @vue-ignore
     */
    ButtonHTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context'

defineProps<DatePickerViewTriggerProps>()
const datePicker = useDatePickerContext()
const viewProps = useDatePickerViewPropsContext()
</script>

<template>
  <ark.button v-bind="datePicker.getViewTriggerProps(viewProps)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
