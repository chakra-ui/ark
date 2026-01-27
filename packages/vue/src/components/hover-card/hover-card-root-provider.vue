<script lang="ts">
import type { UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { UseHoverCardReturn } from './use-hover-card'
import type { RootEmits as PresenceEmits } from '../presence/presence.types'

interface RootProviderProps {
  value: UnwrapRef<UseHoverCardReturn>
}

export interface HoverCardRootProviderBaseProps extends RootProviderProps, RenderStrategyProps {}
export interface HoverCardRootProviderProps extends HoverCardRootProviderBaseProps {}
export interface HoverCardRootProviderEmits extends PresenceEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { PresenceProvider, usePresence } from '../presence'
import { HoverCardProvider } from './use-hover-card-context'

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
