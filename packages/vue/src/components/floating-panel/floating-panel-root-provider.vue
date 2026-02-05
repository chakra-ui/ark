<script lang="ts">
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { UseFloatingPanelReturn } from './use-floating-panel'
import type { RootEmits as PresenceEmits } from '../presence/presence.types'

export interface FloatingPanelRootProviderBaseProps extends RenderStrategyProps {
  value: UnwrapRef<UseFloatingPanelReturn>
}
export interface FloatingPanelRootProviderProps extends FloatingPanelRootProviderBaseProps {}
export interface FloatingPanelRootProviderEmits extends PresenceEmits {}
</script>

<script setup lang="ts">
import { computed, type UnwrapRef } from 'vue'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { PresenceProvider, usePresence } from '../presence'
import { FloatingPanelProvider } from './use-floating-panel-context'

const props = defineProps<FloatingPanelRootProviderProps>()
const emits = defineEmits<FloatingPanelRootProviderEmits>()

const floatingPanel = computed(() => props.value)
FloatingPanelProvider(floatingPanel)

const presence = usePresence(
  computed(() => ({
    present: floatingPanel.value.open,
    lazyMount: props.lazyMount,
    unmountOnExit: props.unmountOnExit,
  })),
  // @ts-expect-error TODO tweak EmitFn
  emits,
)
PresenceProvider(presence)

useForwardExpose()
</script>

<template>
  <slot />
</template>
