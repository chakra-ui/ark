<script lang="ts">
import type { ViewportProps } from '@zag-js/navigation-menu'
import type { HTMLAttributes } from 'vue'
import type { PolymorphicProps } from '../factory'

export interface NavigationMenuViewportBaseProps extends ViewportProps, PolymorphicProps {}
export interface NavigationMenuViewportProps
  extends
    NavigationMenuViewportBaseProps,
    /**
     * @vue-ignore
     */
    HTMLAttributes {}
</script>

<script setup lang="ts">
import { mergeProps } from '@zag-js/vue'
import { computed } from 'vue'
import { ark } from '../factory'
import { usePresence } from '../presence'
import { useNavigationMenuContext } from './use-navigation-menu-context'
import { useForwardExpose } from '../../utils/use-forward-expose'
import { useRenderStrategyProps } from '../../utils/use-render-strategy'

const props = defineProps<NavigationMenuViewportProps>()

const navigationMenu = useNavigationMenuContext()
const renderStrategy = useRenderStrategyProps()
const presence = usePresence(computed(() => ({ ...renderStrategy.value, present: navigationMenu.value.open })))

const mergedProps = computed(() =>
  mergeProps(navigationMenu.value.getViewportProps(props), presence.value.presenceProps),
)

useForwardExpose()
</script>

<template>
  <ark.div v-if="!presence.unmounted" v-bind="mergedProps" :as-child="asChild">
    <slot />
  </ark.div>
</template>
