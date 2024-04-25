<script lang="ts">
import type { RenderStrategyProps } from '../../utils/render-strategy'
import type { RootEmits, RootProps } from './tooltip.types'

export interface TooltipRootProps extends RootProps, RenderStrategyProps {}
export interface TooltipRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyProvider } from '../../utils/use-render-strategy'
import { useTooltip } from './use-tooltip'
import { TooltipProvider } from './use-tooltip-context'

const props = withDefaults(defineProps<TooltipRootProps>(), { open: undefined })
const emits = defineEmits<TooltipRootEmits>()

const tooltip = useTooltip(props, emits)

TooltipProvider(tooltip)
RenderStrategyProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)
</script>

<template>
  <slot />
</template>
