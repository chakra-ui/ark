<script lang="ts">
import type { UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils'
import type { UseHoverCardReturn } from './use-hover-card'

interface RootProviderProps {
  value: UnwrapRef<UseHoverCardReturn>
}

export interface HoverCardRootProviderProps extends RootProviderProps, RenderStrategyProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils'
import { HoverCardProvider } from './use-hover-card-context'

const props = defineProps<HoverCardRootProviderProps>()
const hoverCard = computed(() => props.value)

HoverCardProvider(hoverCard)
RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)
</script>

<template>
  <slot />
</template>
