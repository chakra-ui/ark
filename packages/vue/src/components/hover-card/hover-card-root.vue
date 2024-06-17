<script lang="ts">
import type { BooleanDefaults } from '../../types'
import type { RenderStrategyProps } from '../../utils'
import type { RootEmits, RootProps } from './hover-card.types'

export interface HoverCardRootBaseProps extends RootProps, RenderStrategyProps {}
export interface HoverCardRootProps extends HoverCardRootBaseProps {}
export interface HoverCardRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils'
import { useHoverCard } from './use-hover-card'
import { HoverCardProvider } from './use-hover-card-context'

const props = withDefaults(defineProps<HoverCardRootProps>(), {
  defaultOpen: undefined,
  open: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<HoverCardRootEmits>()

const hoverCard = useHoverCard(props, emits)

HoverCardProvider(hoverCard)
RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)
</script>

<template>
  <slot />
</template>
