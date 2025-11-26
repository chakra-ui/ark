<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types'
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './date-picker.types'

export interface DatePickerRootBaseProps extends RootProps, RenderStrategyProps, PolymorphicProps {}
export interface DatePickerRootProps
  extends DatePickerRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface DatePickerRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useDatePicker } from './use-date-picker'
import { DatePickerProvider } from './use-date-picker-context'

const props = withDefaults(defineProps<DatePickerRootProps>(), {
  closeOnSelect: undefined,
  defaultOpen: undefined,
  disabled: undefined,
  fixedWeeks: undefined,
  inline: undefined,
  invalid: undefined,
  open: undefined,
  outsideDaySelectable: undefined,
  readOnly: undefined,
  required: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<DatePickerRootEmits>()

const datePicker = useDatePicker(props, emits)
DatePickerProvider(datePicker)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="datePicker.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
