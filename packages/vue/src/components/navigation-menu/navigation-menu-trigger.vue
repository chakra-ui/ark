<script lang="ts">
import type { ItemProps } from '@zag-js/navigation-menu'
import type { ButtonHTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NavigationMenuTriggerBaseProps extends ItemProps, PolymorphicProps {}
export interface NavigationMenuTriggerProps
  extends NavigationMenuTriggerBaseProps,
    /**
     * @vue-ignore
     */
    Omit<ButtonHTMLAttributes, 'disabled' | 'value'> {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<NavigationMenuTriggerProps>()
const navigationMenu = useNavigationMenuContext()

useForwardExpose()
</script>

<template>
  <ark.button v-bind="navigationMenu.getTriggerProps(props)" :as-child="asChild">
    <slot />
  </ark.button>
</template>
