<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { PolymorphicProps } from '../factory'
import type { UseDatePickerReturn } from './use-date-picker'
import type { RootEmits as PresenceEmits } from '../presence/presence.types'

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
export interface DatePickerRootProviderEmits extends PresenceEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { PresenceProvider, usePresence } from '../presence'
import { DatePickerProvider } from './use-date-picker-context'

const props = defineProps<DatePickerRootProviderProps>()
const emits = defineEmits<DatePickerRootProviderEmits>()

const datePicker = computed(() => props.value)

const presence = usePresence(
  computed(() => ({
    present: datePicker.value.open,
    lazyMount: props.lazyMount,
    unmountOnExit: props.unmountOnExit,
  })),
  // @ts-expect-error TODO tweak EmitFn
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
