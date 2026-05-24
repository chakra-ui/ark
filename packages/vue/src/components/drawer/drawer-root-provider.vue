<script lang="ts">
import type { UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils/use-render-strategy.ts'
import type { UseDrawerReturn } from './use-drawer.ts'

interface RootProviderProps {
  value: UnwrapRef<UseDrawerReturn>
}

export interface DrawerRootProviderBaseProps extends RootProviderProps, RenderStrategyProps {}
export interface DrawerRootProviderProps extends DrawerRootProviderBaseProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy.ts'
import { DrawerProvider } from './use-drawer-context.ts'
import { useForwardExpose } from '../../utils/index.ts'
import { PresenceProvider, usePresence } from '../presence/index.ts'

const props = defineProps<DrawerRootProviderProps>()
const drawer = computed(() => props.value)

DrawerProvider(drawer)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

const presence = usePresence(computed(() => ({ present: drawer.value.open })))
PresenceProvider(presence)

useForwardExpose()
</script>

<template>
  <slot />
</template>
