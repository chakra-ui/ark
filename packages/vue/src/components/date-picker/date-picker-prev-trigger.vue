<script lang="ts">
import type { PolymorphicProps } from '../factory'

export interface DatePickerPrevTriggerProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { useDatePickerViewPropsContext } from './use-date-picker-view-props-context'

defineProps<DatePickerPrevTriggerProps>()
const datePicker = useDatePickerContext()
const viewProps = useDatePickerViewPropsContext()
</script>

<template>
  <ark.button v-bind="datePicker.getPrevTriggerProps(viewProps)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
