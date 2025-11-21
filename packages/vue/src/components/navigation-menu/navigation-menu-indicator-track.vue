<script lang="ts">
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NavigationMenuIndicatorTrackBaseProps extends PolymorphicProps {}
export interface NavigationMenuIndicatorTrackProps
  extends NavigationMenuIndicatorTrackBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { ark } from '../factory'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useForwardExpose } from '../../utils/use-forward-expose'

defineProps<NavigationMenuIndicatorTrackProps>()
const navigationMenu = useNavigationMenuContext()

useForwardExpose()
</script>

<template>
  <ark.div v-bind="navigationMenu.getIndicatorTrackProps()" :as-child="asChild">
    <slot />
  </ark.div>
</template>
