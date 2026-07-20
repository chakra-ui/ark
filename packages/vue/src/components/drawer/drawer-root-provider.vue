<script lang="ts">
import type { UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils/use-render-strategy.ts'
import type { UseDrawerReturn } from './use-drawer.ts'
import type { RootEmits as PresenceEmits } from '../presence/presence.types.ts'

interface RootProviderProps {
  value: UnwrapRef<UseDrawerReturn>
}

export interface DrawerRootProviderBaseProps extends RootProviderProps, RenderStrategyProps {}
export interface DrawerRootProviderProps extends DrawerRootProviderBaseProps {}
export interface DrawerRootProviderEmits extends PresenceEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy.ts'
import { DrawerProvider } from './use-drawer-context.ts'
import { useForwardExpose } from '../../utils/index.ts'
import { PresenceProvider, usePresence } from '../presence/index.ts'

const props = defineProps<DrawerRootProviderProps>()
const emits = defineEmits<DrawerRootProviderEmits>()
const drawer = computed(() => props.value)

const presence = usePresence(
  computed(() => ({
    present: drawer.value.open,
    lazyMount: props.lazyMount,
    unmountOnExit: props.unmountOnExit,
  })),
  // @ts-expect-error TODO tweak EmitFn
  emits,
)

DrawerProvider(drawer)
PresenceProvider(presence)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

useForwardExpose()
</script>

<template>
  <slot />
</template>
