<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BooleanDefaults } from '../../types.ts'
import type { RenderStrategyProps } from '../../utils/use-render-strategy.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { RootEmits, RootProps } from './date-picker.types.ts'

export interface DatePickerRootBaseProps extends RootProps, RenderStrategyProps, PolymorphicProps {}
export interface DatePickerRootProps
  extends
    DatePickerRootBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
export interface DatePickerRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { PresenceProvider, usePresence } from '../presence/index.ts'
import { useDatePicker } from './use-date-picker.ts'
import { DatePickerProvider } from './use-date-picker-context.ts'

const props = withDefaults(defineProps<DatePickerRootProps>(), {
  closeOnSelect: undefined,
  defaultOpen: undefined,
  disabled: undefined,
  fixedWeeks: undefined,
  inline: undefined,
  invalid: undefined,
  open: undefined,
  openOnClick: undefined,
  outsideDaySelectable: undefined,
  readOnly: undefined,
  required: undefined,
  showWeekNumbers: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<DatePickerRootEmits>()

const datePicker = useDatePicker(props, emits)

const presence = usePresence(
  computed(() => ({
    present: datePicker.value.open,
    lazyMount: props.lazyMount,
    unmountOnExit: props.unmountOnExit,
  })),
  emits,
)

DatePickerProvider(datePicker)
PresenceProvider(presence)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="datePicker.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
