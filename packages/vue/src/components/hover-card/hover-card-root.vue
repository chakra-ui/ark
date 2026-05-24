<script lang="ts">
import type { BooleanDefaults } from '../../types.ts'
import type { RenderStrategyProps } from '../../utils/use-render-strategy.ts'
import type { RootEmits, RootProps } from './hover-card.types.ts'

export interface HoverCardRootBaseProps extends RootProps, RenderStrategyProps {}
export interface HoverCardRootProps extends HoverCardRootBaseProps {}
export interface HoverCardRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { PresenceProvider, usePresence } from '../presence/index.ts'
import { useHoverCard } from './use-hover-card.ts'
import { HoverCardProvider } from './use-hover-card-context.ts'

const props = withDefaults(defineProps<HoverCardRootProps>(), {
  defaultOpen: undefined,
  disabled: undefined,
  open: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<HoverCardRootEmits>()

const hoverCard = useHoverCard(props, emits)

const presence = usePresence(
  computed(() => ({
    present: hoverCard.value.open,
    lazyMount: props.lazyMount,
    unmountOnExit: props.unmountOnExit,
  })),
  emits,
)

HoverCardProvider(hoverCard)
PresenceProvider(presence)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

useForwardExpose()
</script>

<template>
  <slot />
</template>
