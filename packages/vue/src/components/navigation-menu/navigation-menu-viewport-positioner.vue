<script lang="ts">
import type { ViewportProps } from '@zag-js/navigation-menu'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NavigationMenuViewportPositionerBaseProps extends ViewportProps, PolymorphicProps {}
export interface NavigationMenuViewportPositionerProps
  extends
    NavigationMenuViewportPositionerBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<NavigationMenuViewportPositionerProps>()
const navigationMenu = useNavigationMenuContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="navigationMenu.getViewportPositionerProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
