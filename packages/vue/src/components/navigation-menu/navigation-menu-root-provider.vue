<script lang="ts">
import type { UnwrapRef } from 'vue'
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { UseNavigationMenuReturn } from './use-navigation-menu'

interface RootProviderProps {
  value: UnwrapRef<UseNavigationMenuReturn>
}
export interface NavigationMenuRootProviderBaseProps extends RootProviderProps, RenderStrategyProps {}
export interface NavigationMenuRootProviderProps extends NavigationMenuRootProviderBaseProps {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { NavigationMenuProvider } from './use-navigation-menu-context'

const props = defineProps<NavigationMenuRootProviderProps>()
const navigationMenu = computed(() => props.value)

NavigationMenuProvider(navigationMenu)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

useForwardExpose()
</script>

<template>
  <ark.nav v-bind="navigationMenu.getRootProps()">
    <slot />
  </ark.nav>
</template>
