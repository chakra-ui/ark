<script lang="ts">
import type { UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils'
import type { UseHoverCardReturn } from './use-hover-card'

interface RootProviderProps {
  value: UnwrapRef<UseHoverCardReturn>
}

export interface HoverCardRootProviderBaseProps extends RootProviderProps, RenderStrategyProps {}
export interface HoverCardRootProviderProps extends HoverCardRootProviderBaseProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider, useForwardExpose } from '../../utils'
import { HoverCardProvider } from './use-hover-card-context'

const props = defineProps<HoverCardRootProviderProps>()
const hoverCard = computed(() => props.value)

HoverCardProvider(hoverCard)
RenderStrategyPropsProvider(
  computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })),
)

useForwardExpose()
</script>

<template>
  <slot />
</template>
