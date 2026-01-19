<script lang="ts">
import type { LinkProps } from '@zag-js/navigation-menu'
import type { AnchorHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NavigationMenuLinkBaseProps extends Partial<LinkProps>, PolymorphicProps {}
export interface NavigationMenuLinkProps
  extends
    NavigationMenuLinkBaseProps,
    /**
     * @vue-ignore
     */
    Omit<AnchorHTMLAttributes, 'current' | 'onSelect'> {}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<NavigationMenuLinkProps>()
const navigationMenu = useNavigationMenuContext()
const itemContext = useNavigationMenuItemPropsContext()

const value = computed(() => props.value ?? itemContext?.value?.value)
const linkProps = computed(() => ({ ...props, value: value.value }))

useForwardExpose()
</script>

<template>
  <ark.a v-bind="navigationMenu.getLinkProps(linkProps)" :as-child="asChild">
    <slot />
  </ark.a>
</template>
