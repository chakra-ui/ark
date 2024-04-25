<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface DatePickerNextTriggerProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context'

defineProps<DatePickerNextTriggerProps>()
const datePicker = useDatePickerContext()
const viewProps = useDatePickerViewPropsContext()
</script>

<template>
  <ark.div v-bind="datePicker.getNextTriggerProps(viewProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
