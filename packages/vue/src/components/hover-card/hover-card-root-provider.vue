<script lang="ts">
import type { UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils/use-render-strategy.ts'
import type { UseHoverCardReturn } from './use-hover-card.ts'
import type { RootEmits as PresenceEmits } from '../presence/presence.types.ts'

interface RootProviderProps {
  value: UnwrapRef<UseHoverCardReturn>
}

export interface HoverCardRootProviderBaseProps extends RootProviderProps, RenderStrategyProps {}
export interface HoverCardRootProviderProps extends HoverCardRootProviderBaseProps {}
export interface HoverCardRootProviderEmits extends PresenceEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { PresenceProvider, usePresence } from '../presence/index.ts'
import { HoverCardProvider } from './use-hover-card-context.ts'

const props = defineProps<HoverCardRootProviderProps>()
const emits = defineEmits<HoverCardRootProviderEmits>()

const hoverCard = computed(() => props.value)

const presence = usePresence(
  computed(() => ({
    present: hoverCard.value.open,
    lazyMount: props.lazyMount,
    unmountOnExit: props.unmountOnExit,
  })),
  // @ts-expect-error TODO tweak EmitFn
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
