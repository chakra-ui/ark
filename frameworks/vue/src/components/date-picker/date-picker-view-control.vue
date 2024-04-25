<script lang="ts">
import type { PolimoprhicProps } from '../factory'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context'

export interface DatePickerViewControlProps extends PolimoprhicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'

defineProps<DatePickerViewControlProps>()
const datePicker = useDatePickerContext()
const viewProps = useDatePickerViewPropsContext()
</script>

<template>
  <ark.div v-bind="datePicker.getViewControlProps(viewProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
