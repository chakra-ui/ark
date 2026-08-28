<script lang="ts">
import type { ViewportProps } from '@zag-js/navigation-menu'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory.ts'

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
import { computed } from 'vue'
import { ark } from '../factory.ts'
import { useNavigationMenuContext } from './use-navigation-menu-context.ts'
import { setNavigationMenuViewportPropsContext } from './use-navigation-menu-viewport-props-context.ts'
import { useForwardExpose } from '../../utils/use-forward-expose.ts'

const props = defineProps<NavigationMenuViewportPositionerProps>()
const navigationMenu = useNavigationMenuContext()

const viewportProps = computed(() => ({ align: props.align }))
setNavigationMenuViewportPropsContext(viewportProps)

useForwardExpose()
</script>

<template>
  <ark.div v-bind="navigationMenu.getViewportPositionerProps(viewportProps)" :as-child="asChild">
    <slot />
  </ark.div>
</template>
