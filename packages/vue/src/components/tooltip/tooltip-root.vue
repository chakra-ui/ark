<script lang="ts">
import type { BooleanDefaults } from '../../types'
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { RootEmits, RootProps } from './tooltip.types'

export interface TooltipRootBaseProps extends RootProps, RenderStrategyProps {}
export interface TooltipRootProps extends TooltipRootBaseProps {}
export interface TooltipRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { useTooltip } from './use-tooltip'
import { TooltipProvider } from './use-tooltip-context'

const props = withDefaults(defineProps<TooltipRootProps>(), {
  closeOnClick: undefined,
  closeOnEscape: undefined,
  closeOnPointerDown: undefined,
  closeOnScroll: undefined,
  defaultOpen: undefined,
  disabled: undefined,
  interactive: undefined,
  open: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<TooltipRootEmits>()

const tooltip = useTooltip(props, emits)

TooltipProvider(tooltip)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

useForwardExpose()
</script>

<template>
  <slot />
</template>
