<script lang="ts">
import type { DateView } from '@zag-js/date-picker'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

export interface DatePickerViewBaseProps extends PolymorphicProps {}
export interface DatePickerViewProps
  extends
    DatePickerViewBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {
  view: DateView
}
</script>

<script setup lang="ts">
import { ark } from '../factory.ts'
import { useDatePickerContext } from './use-date-picker-context.ts'
import { DatePickerViewPropsProvider } from './use-date-picker-view-props-context.ts'
import { datePickerAnatomy } from './date-picker.anatomy.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<DatePickerViewProps>()
const datePicker = useDatePickerContext()

DatePickerViewPropsProvider(props)
useForwardExpose()
</script>

<template>
  <ark.div v-bind="datePickerAnatomy.build().view.attrs" :hidden="datePicker.view !== view" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
