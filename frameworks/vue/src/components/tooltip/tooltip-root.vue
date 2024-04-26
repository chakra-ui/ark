<script lang="ts">
import type { RenderStrategyProps } from '../../utils'
import type { RootEmits, RootProps } from './tooltip.types'

export interface TooltipRootProps extends RootProps, RenderStrategyProps {}
export interface TooltipRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils'
import { useTooltip } from './use-tooltip'
import { TooltipProvider } from './use-tooltip-context'

const props = withDefaults(defineProps<TooltipRootProps>(), {
  defaultOpen: undefined,
  open: undefined,
})
const emits = defineEmits<TooltipRootEmits>()

const tooltip = useTooltip(props, emits)

TooltipProvider(tooltip)
RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)
</script>

<template>
  <slot />
</template>
