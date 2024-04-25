<script lang="ts">
import type { RenderStrategyProps } from '../../utils/render-strategy'
import type { RootEmits, RootProps } from './hover-card.types'

export interface HoverCardRootProps extends RootProps, RenderStrategyProps {}
export interface HoverCardRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyProvider } from '../../utils/use-render-strategy'
import { useHoverCard } from './use-hover-card'
import { HoverCardProvider } from './use-hover-card-context'

const props = withDefaults(defineProps<HoverCardRootProps>(), {open: undefined})
const emits = defineEmits<HoverCardRootEmits>()

const hoverCard = useHoverCard(props, emits)

HoverCardProvider(hoverCard)
RenderStrategyProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)
</script>

<template>
  <slot />
</template>
