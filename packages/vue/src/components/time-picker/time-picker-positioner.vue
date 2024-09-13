<script lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { type PolymorphicProps, ark } from '../factory'

export interface TimePickerPositionerBaseProps extends PolymorphicProps {}
export interface TimePickerPositionerProps
  extends TimePickerPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useRenderStrategyProps } from '../../utils'
import { PresenceProvider, usePresence } from '../presence'
import { useTimePickerContext } from './use-time-picker-context'

defineProps<TimePickerPositionerProps>()
const timePicker = useTimePickerContext()
const renderStrategy = useRenderStrategyProps()

const presence = usePresence(
  computed(() => ({
    ...renderStrategy.value,
    present: timePicker.value.open,
  })),
)
PresenceProvider(presence)
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="timePicker.getPositionerProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
