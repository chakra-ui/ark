<script lang="ts">
import type { UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { UseTooltipReturn } from './use-tooltip'
import type { RootEmits as PresenceEmits } from '../presence/presence.types'

interface RootProviderProps {
  value: UnwrapRef<UseTooltipReturn>
}
export interface TooltipRootProviderBaseProps extends RootProviderProps, RenderStrategyProps {}
export interface TooltipRootProviderProps extends TooltipRootProviderBaseProps {}
export interface TooltipRootProviderEmits extends PresenceEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { PresenceProvider, usePresence } from '../presence'
import { TooltipProvider } from './use-tooltip-context'

const props = defineProps<TooltipRootProviderProps>()
const emits = defineEmits<TooltipRootProviderEmits>()

const tooltip = computed(() => props.value)

const presence = usePresence(
  computed(() => ({
    present: tooltip.value.open,
    lazyMount: props.lazyMount,
    unmountOnExit: props.unmountOnExit,
  })),
  // @ts-expect-error TODO tweak EmitFn
  emits,
)

TooltipProvider(tooltip)
PresenceProvider(presence)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

useForwardExpose()
</script>

<template>
  <slot />
</template>
