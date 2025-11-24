<script lang="ts">
import type { RenderStrategyProps } from '../../utils/use-render-strategy'
import type { RootEmits, RootProps } from './navigation-menu.types'

export interface NavigationMenuRootBaseProps extends RootProps, RenderStrategyProps {}
export interface NavigationMenuRootProps extends NavigationMenuRootBaseProps {}
export interface NavigationMenuRootEmits extends RootEmits {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RenderStrategyPropsProvider } from '../../utils/use-render-strategy'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { ark } from '../factory'
import { useNavigationMenu } from './use-navigation-menu'
import { NavigationMenuProvider } from './use-navigation-menu-context'
import type { BooleanDefaults } from '../../types'

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
