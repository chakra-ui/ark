<script lang="ts">
import type { UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils'
import type { UseTooltipReturn } from './use-tooltip'

interface RootProviderProps {
  value: UnwrapRef<UseTooltipReturn>
}
export interface TooltipRootProviderBaseProps extends RootProviderProps, RenderStrategyProps {}
export interface TooltipRootProviderProps extends TooltipRootProviderBaseProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider, useForwardExpose } from '../../utils'
import { TooltipProvider } from './use-tooltip-context'

const props = defineProps<TooltipRootProviderProps>()
const tooltip = computed(() => props.value)

TooltipProvider(tooltip)
RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)

useForwardExpose()
</script>

<template>
  <slot />
</template>
