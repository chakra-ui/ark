<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NavigationMenuListBaseProps extends PolymorphicProps {}
export interface NavigationMenuListProps
  extends NavigationMenuListBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<NavigationMenuListProps>()
const navigationMenu = useNavigationMenuContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="navigationMenu.getListProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
