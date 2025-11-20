<script lang="ts">
import type { LinkProps } from '@zag-js/navigation-menu'
import type { AnchorHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NavigationMenuLinkBaseProps extends LinkProps, PolymorphicProps {}
export interface NavigationMenuLinkProps
  extends NavigationMenuLinkBaseProps,
    /**
     * @vue-ignore
     */
    Omit<AnchorHTMLAttributes, 'current' | 'onSelect'> {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<NavigationMenuLinkProps>()
const navigationMenu = useNavigationMenuContext()

useForwardExpose()
</script>

<template>
  <ark.a v-bind="navigationMenu.getLinkProps(props)" :as-child="asChild">
    <slot />
  </ark.a>
</template>
