<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils'
import type { PolymorphicProps } from '../factory'
import type { UseTimePickerReturn } from './use-time-picker'

interface RootProviderProps {
  value: UnwrapRef<UseTimePickerReturn>
}

export interface TimePickerRootProviderBaseProps
  extends RootProviderProps,
    RenderStrategyProps,
    PolymorphicProps {}
export interface TimePickerRootProviderProps
  extends TimePickerRootProviderBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils'
import { ark } from '../factory'
import { TimePickerProvider } from './use-time-picker-context'

const props = defineProps<TimePickerRootProviderProps>()
const timePicker = computed(() => props.value)

TimePickerProvider(timePicker)
RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)
</script>

<template>
  <ark.div v-bind="timePicker.getRootProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
