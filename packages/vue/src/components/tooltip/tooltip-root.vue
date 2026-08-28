<script lang="ts">
import type { BooleanDefaults } from '../../types.ts'
import type { RenderStrategyProps } from '../../utils/use-render-strategy.ts'
import type { RootEmits, RootProps } from './tooltip.types.ts'

export interface TooltipRootBaseProps extends RootProps, RenderStrategyProps {}
export interface TooltipRootProps extends TooltipRootBaseProps {}
export interface TooltipRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { PresenceProvider, usePresence } from '../presence/index.ts'
import { useTooltip } from './use-tooltip.ts'
import { TooltipProvider } from './use-tooltip-context.ts'

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

const presence = usePresence(
  computed(() => ({
    present: tooltip.value.open,
    lazyMount: props.lazyMount,
    unmountOnExit: props.unmountOnExit,
  })),
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
