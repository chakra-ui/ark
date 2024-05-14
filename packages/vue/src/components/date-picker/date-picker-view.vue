<script lang="ts">
import type { DateView } from '@zag-js/date-picker'
import type { PolymorphicProps } from '../factory'

export interface DatePickerViewProps extends PolymorphicProps {
  view: DateView
}
</script>

<script setup lang="ts">
import { datePickerAnatomy } from '@ark-ui/anatomy'
import { ark } from '../factory'
import { useDatePickerContext } from './use-date-picker-context'
import { DatePickerViewPropsProvider } from './use-date-picker-view-props-context'

const props = defineProps<DatePickerViewProps>()
const datePicker = useDatePickerContext()

DatePickerViewPropsProvider(props)
</script>

<template>
  <ark.div
    v-bind="datePickerAnatomy.build().view.attrs"
    :hidden="datePicker.view !== view"
    :as-child="asChild"
  >
    <slot />
  </ark.div>
</template>
