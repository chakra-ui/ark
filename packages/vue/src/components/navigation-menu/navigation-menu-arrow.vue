<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NavigationMenuArrowBaseProps extends PolymorphicProps {}
export interface NavigationMenuArrowProps
  extends NavigationMenuArrowBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<NavigationMenuArrowProps>()
const navigationMenu = useNavigationMenuContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="navigationMenu.getArrowProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
