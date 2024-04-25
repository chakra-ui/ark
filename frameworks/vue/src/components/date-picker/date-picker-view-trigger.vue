<script lang="ts">
import type { PolimoprhicProps } from '../factory'

export interface DatePickerViewTriggerProps extends PolimoprhicProps {}
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
