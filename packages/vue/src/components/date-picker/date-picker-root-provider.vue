<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils'
import type { PolymorphicProps } from '../factory'
import type { UseDatePickerReturn } from './use-date-picker'

interface RootProviderProps {
  value: UnwrapRef<UseDatePickerReturn>
}

export interface DatePickerRootProviderBaseProps
  extends RootProviderProps,
    RenderStrategyProps,
    PolymorphicProps {}
export interface DatePickerRootProviderProps
  extends DatePickerRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
iimport { computed } from 'vue'
import { RenderStrategyPropsProvider,useForwardExpose } from '../../utils'
import { ark } from '../factory'
import { DatePickerProvider } from './use-date-picker-context'
const props = defineProps<DatePickerRootProviderProps>()
const datePicker = computed(() => props.value)

DatePickerProvider(datePicker)
RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="datePicker.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
