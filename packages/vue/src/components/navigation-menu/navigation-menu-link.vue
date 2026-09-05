<script lang="ts">
import type { LinkProps } from '@zag-js/navigation-menu'
import type { AnchorHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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
import { ark } from '../factory.ts'
import { useNavigationMenuContext } from './use-navigation-menu-context.ts'
import { useNavigationMenuItemPropsContext } from './use-navigation-menu-item-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<NavigationMenuLinkProps>()
const navigationMenu = useNavigationMenuContext()
const itemContext = useNavigationMenuItemPropsContext()

const value = computed(() => props.value ?? itemContext?.value?.value)
const linkProps = computed(() => ({ ...props, value: value.value }))

useForwardExpose()
</script>

<template>
  <ark.a v-bind="navigationMenu.getLinkProps(linkProps)" :as-child="asChild">
    <template v-if="$slots.render" #render="scope">
      <slot name="render" v-bind="scope" />
    </template>
    <template v-else #default>
      <slot />
    </template>
  </ark.a>
</template>
