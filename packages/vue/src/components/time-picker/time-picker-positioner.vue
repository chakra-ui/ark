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
imimport { useForwardExpose,useRenderStrategyProps } from '../../utils'
import { PresenceProvider,usePresence } from '../presence'
import { useTimePickerContext } from './use-time-picker-context'
efineProps<TimePickerPositionerProps>()

const timePicker = useTimePickerContext()
const renderStrategy = useRenderStrategyProps()

const presence = usePresence(
  computed(() => ({
    ...renderStrategy.value,
    present: timePicker.value.open,
  })),
)

PresenceProvider(presence)

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="timePicker.getPositionerProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
