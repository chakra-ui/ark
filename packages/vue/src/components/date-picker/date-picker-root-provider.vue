<script lang="ts">
import type { HTMLAttributes, UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils/use-render-strategy.ts'
import type { PolymorphicProps } from '../factory.ts'
import type { UseDatePickerReturn } from './use-date-picker.ts'
import type { RootEmits as PresenceEmits } from '../presence/presence.types.ts'

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
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { PresenceProvider, usePresence } from '../presence/index.ts'
import { DatePickerProvider } from './use-date-picker-context.ts'

const props = defineProps<DatePickerRootProviderProps>()
const emits = defineEmits<DatePickerRootProviderEmits>()

const datePicker = computed(() => props.value)

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
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.div>
</template>
