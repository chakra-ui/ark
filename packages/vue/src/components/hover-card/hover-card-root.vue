<script lang="ts">
import type { BooleanDefaults } from '../../types'
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { RootEmits, RootProps } from './hover-card.types'

export interface HoverCardRootBaseProps extends RootProps, RenderStrategyProps {}
export interface HoverCardRootProps extends HoverCardRootBaseProps {}
export interface HoverCardRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { useHoverCard } from './use-hover-card'
import { HoverCardProvider } from './use-hover-card-context'

const props = withDefaults(defineProps<HoverCardRootProps>(), {
  defaultOpen: undefined,
  disabled: undefined,
  open: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<HoverCardRootEmits>()

const hoverCard = useHoverCard(props, emits)

HoverCardProvider(hoverCard)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

useForwardExpose()
</script>

<template>
  <slot />
</template>
