<script lang="ts">
import type { DateView } from '@zag-js/date-picker'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DatePickerViewBaseProps extends PolymorphicProps {}
export interface DatePickerViewProps
  extends DatePickerViewBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {
  view: DateView
}
</script>

<script setup lang="ts">
import { useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { datePickerAnatomy } from './date-picker.anatomy'
import { useDatePickerContext } from './use-date-picker-context'
import { DatePickerViewPropsProvider } from './use-date-picker-view-props-context'

const props = defineProps<DatePickerViewProps>()
const datePicker = useDatePickerContext()

DatePickerViewPropsProvider(props)
useForwardExpose()
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
