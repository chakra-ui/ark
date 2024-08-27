<script lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { type PolymorphicProps, ark } from '../factory'

export interface TooltipPositionerBaseProps extends PolymorphicProps {}
export interface TooltipPositionerProps
  extends TooltipPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { useRenderStrategyProps } from '../../utils'
import { PresenceProvider, usePresence } from '../presence'
import { useTooltipContext } from './use-tooltip-context'

defineProps<TooltipPositionerProps>()
const tooltip = useTooltipContext()
const renderStrategy = useRenderStrategyProps()

const presence = usePresence(
  computed(() => ({
    ...renderStrategy.value,
    present: tooltip.value.open,
  })),
)
PresenceProvider(presence)
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="tooltip.getPositionerProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>