<script lang="ts">
import type { DateValue } from '@zag-js/date-picker'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface DatePickerValueTextRenderProps {
  value: DateValue
  index: number
  valueAsString: string
  remove: () => void
}

export interface DatePickerValueTextBaseProps extends PolymorphicProps {
  /**
   * Text to display when no date is selected.
   */
  placeholder?: string | undefined
  /**
   * The separator to use between multiple date values when using default rendering.
   * @default ", "
   */
  separator?: string | undefined
}

export interface DatePickerValueTextProps
  extends
    DatePickerValueTextBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { datePickerAnatomy } from './date-picker.anatomy'
import { useDatePickerContext } from './use-date-picker-context'

const props = withDefaults(defineProps<DatePickerValueTextProps>(), {
  separator: ', ',
})

const datePicker = useDatePickerContext()

const hasValue = computed(() => datePicker.value.value.length > 0)

const displayValue = computed(() => {
  if (!hasValue.value) return props.placeholder
  return datePicker.value.valueAsString.join(props.separator)
})

const getRenderProps = (value: DateValue, index: number): DatePickerValueTextRenderProps => ({
  value,
  index,
  valueAsString: datePicker.value.valueAsString[index],
  remove: () => {
    datePicker.value.setValue(datePicker.value.value.filter((_, i) => i !== index))
  },
})

useForwardExpose()
</script>

<template>
  <template v-if="$slots.default">
    <template v-if="hasValue">
      <template v-for="(value, index) in datePicker.value" :key="index">
        <slot v-bind="getRenderProps(value, index)" />
      </template>
    </template>
    <template v-else>{{ placeholder }}</template>
  </template>
  <ark.span v-else v-bind="datePickerAnatomy.build().valueText.attrs" :as-child="asChild">
    {{ displayValue }}
  </ark.span>
</template>
