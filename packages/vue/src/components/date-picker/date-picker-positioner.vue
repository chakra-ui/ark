<script lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { type PolymorphicProps, ark } from '../factory'

export interface DatePickerPositionerBaseProps extends PolymorphicProps {}
export interface DatePickerPositionerProps
  extends DatePickerPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useRenderStrategyProps } from '../../utils'
import { PresenceProvider, usePresence } from '../presence'
import { useDatePickerContext } from './use-date-picker-context'
import { useForwardExpose } from '../../utils'

defineProps<DatePickerPositionerProps>()
const datePicker = useDatePickerContext()
const renderStrategy = useRenderStrategyProps()

const presence = usePresence(
  computed(() => ({
    ...renderStrategy.value,
    present: datePicker.value.open,
  })),
)
PresenceProvider(presence)

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="datePicker.getPositionerProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
