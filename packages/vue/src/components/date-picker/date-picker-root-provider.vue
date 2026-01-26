<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { PolymorphicProps } from '../factory'
import type { UseDatePickerReturn } from './use-date-picker'

interface RootProviderProps {
  value: UnwrapRef<UseDatePickerReturn>
}

export interface DatePickerRootProviderBaseProps extends RootProviderProps, RenderStrategyProps, PolymorphicProps {}
export interface DatePickerRootProviderProps
  extends
    DatePickerRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import { ark } from '../factory'
import { DatePickerProvider } from './use-date-picker-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<DatePickerRootProviderProps>()
const datePicker = computed(() => props.value)

DatePickerProvider(datePicker)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

useForwardExpose()
</script>

<template>
  <ark.div v-bind="datePicker.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
