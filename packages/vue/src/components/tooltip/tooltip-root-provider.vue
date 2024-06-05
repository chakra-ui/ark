<script lang="ts">
import type { UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils'
import type { UseTooltipReturn } from './use-tooltip'

interface RootProviderProps {
  value: UnwrapRef<UseTooltipReturn>
}

export interface TooltipRootProviderProps extends RootProviderProps, RenderStrategyProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils'
import { TooltipProvider } from './use-tooltip-context'

const props = defineProps<TooltipRootProviderProps>()
const tooltip = computed(() => props.value)

TooltipProvider(tooltip)
RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)
</script>

<template>
  <slot />
</template>
