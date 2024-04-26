<script lang="ts">
import type { RenderStrategyProps } from '../../utils'
import type { PolymorphicProps } from '../factory'
import type { RootEmits, RootProps } from './date-picker.types'

export interface DatePickerRootProps extends RootProps, RenderStrategyProps, PolymorphicProps {}
export interface DatePickerRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils'
import { ark } from '../factory'
import { useDatePicker } from './use-date-picker'
import { DatePickerProvider } from './use-date-picker-context'

const props = withDefaults(defineProps<DatePickerRootProps>(), {
  closeOnSelect: true,
  defaultOpen: undefined,
  open: undefined,
})
const emits = defineEmits<DatePickerRootEmits>()

const datePicker = useDatePicker(props, emits)
DatePickerProvider(datePicker)
RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)
</script>

<template>
  <ark.div v-bind="datePicker.rootProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
