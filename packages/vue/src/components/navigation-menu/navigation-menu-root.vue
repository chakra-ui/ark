<script lang="ts">
import type { RenderStrategyProps } from '../../utils/use-render-strategy.ts'
import type { RootEmits, RootProps } from './navigation-menu.types.ts'

export interface NavigationMenuRootBaseProps extends RootProps, RenderStrategyProps {}
export interface NavigationMenuRootProps extends NavigationMenuRootBaseProps {}
export interface NavigationMenuRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'
import { ark } from '../factory.ts'
import { useNavigationMenu } from './use-navigation-menu.ts'
import { NavigationMenuProvider } from './use-navigation-menu-context.ts'
import type { BooleanDefaults } from '../../types.ts'

const props = withDefaults(defineProps<NavigationMenuRootProps>(), {
  disableClickTrigger: undefined,
  disableHoverTrigger: undefined,
  disablePointerLeaveClose: undefined,
} satisfies BooleanDefaults<RootProps>)

const emits = defineEmits<NavigationMenuRootEmits>()

const navigationMenu = useNavigationMenu(props, emits)

NavigationMenuProvider(navigationMenu)
RenderStrategyPropsProvider(computed(() => ({ lazyMount: props.lazyMount, unmountOnExit: props.unmountOnExit })))

useForwardExpose()
</script>

<template>
  <ark.nav v-bind="navigationMenu.getRootProps()">
    <slot />
  </ark.nav>
</template>
