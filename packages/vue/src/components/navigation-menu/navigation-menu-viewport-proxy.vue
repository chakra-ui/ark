<script lang="ts">
import type { ItemProps } from '@zag-js/navigation-menu'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NavigationMenuViewportProxyBaseProps extends ItemProps, PolymorphicProps {}
export interface NavigationMenuViewportProxyProps
  extends NavigationMenuViewportProxyBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<NavigationMenuViewportProxyProps>()
const navigationMenu = useNavigationMenuContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="navigationMenu.getViewportProxyProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
