<script lang="ts">
import type { UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { UseDrawerReturn } from './use-drawer'

interface RootProviderProps {
  value: UnwrapRef<UseDrawerReturn>
}

export interface DrawerRootProviderBaseProps extends RootProviderProps, RenderStrategyProps {}
export interface DrawerRootProviderProps extends DrawerRootProviderBaseProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import { DrawerProvider } from './use-drawer-context'
import { useForwardExpose } from '../../utils'
import { PresenceProvider, usePresence } from '../presence'

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
