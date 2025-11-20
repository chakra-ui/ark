<script lang="ts">
import type { ItemProps } from '@zag-js/navigation-menu'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NavigationMenuTriggerProxyBaseProps extends ItemProps, PolymorphicProps {}
export interface NavigationMenuTriggerProxyProps
  extends NavigationMenuTriggerProxyBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

const props = defineProps<NavigationMenuTriggerProxyProps>()
const navigationMenu = useNavigationMenuContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="navigationMenu.getTriggerProxyProps(props)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
